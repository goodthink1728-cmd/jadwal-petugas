/**
 * SIM-JADWAL GURU & KEGIATAN UNIVERSAL
 * Interactive Application Controller
 * Connects to GitHub goodthink1728, XLSX SheetJS, Realtime Search & Rendering
 */

class JadwalApp {
  constructor() {
    this.storageKey = 'SIM_JADWAL_DATA_V1';
    this.currentAvatar = localStorage.getItem('SELECTED_AVATAR') || 'agus'; // 'agus' or 'hijab'
    this.selectedTeacherId = 18; // Default to Pak Agus Gunawan, S.Pd. (#18)
    this.filterHari = 'ALL';
    this.filterRuang = 'ALL';
    this.filterMapel = 'ALL';
    this.activeTab = 'dashboard';
    this.searchQuery = '';

    this.initData();
    this.initElements();
    this.bindEvents();
    this.render();
  }

  // Load from LocalStorage or fall back to DEFAULT_DATA
  initData() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.data = {
          instansi: parsed.instansi || DEFAULT_DATA.instansi,
          petugas: parsed.petugas || DEFAULT_DATA.petugas,
          ruang: parsed.ruang || DEFAULT_DATA.ruang,
          jadwal: parsed.jadwal || DEFAULT_DATA.jadwal
        };
      } catch (e) {
        console.error('Error loading stored data, using defaults', e);
        this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
      }
    } else {
      this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
  }

  saveData() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.data));
  }

  resetData() {
    if (confirm("Apakah Anda yakin ingin mereset seluruh data kembali ke Data Contoh ASAS MTs. Negeri Kota Cimahi?")) {
      this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
      this.selectedTeacherId = 18;
      this.saveData();
      this.render();
      this.showToast("Data berhasil direset ke contoh asli ASAS Cimahi!");
    }
  }

  initElements() {
    // Navigation items
    this.navItems = document.querySelectorAll('[data-tab]');
    this.tabSections = document.querySelectorAll('.tab-content-section');
    this.searchInput = document.getElementById('globalSearchInput');
    this.teacherDropdown = document.getElementById('teacherSelect');
    this.teacherHighlightSelect = document.getElementById('teacherHighlightSelect');
    this.filterHariSelect = document.getElementById('filterHariSelect');
    this.filterRuangSelect = document.getElementById('filterRuangSelect');
  }

  bindEvents() {
    // Tab switching
    this.navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = item.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });

    // Global Search
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.handleSearch();
      });
    }

    // Avatar toggle
    const toggleAvatarBtns = document.querySelectorAll('.js-toggle-avatar');
    toggleAvatarBtns.forEach(btn => {
      btn.addEventListener('click', () => this.toggleAvatar());
    });

    // File Dropzone & input
    const dropzone = document.getElementById('templateDropzone');
    const fileInput = document.getElementById('templateFileInput');

    if (dropzone && fileInput) {
      dropzone.addEventListener('click', () => fileInput.click());
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
      dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
          this.handleFileUpload(e.dataTransfer.files[0]);
        }
      });

      fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          this.handleFileUpload(e.target.files[0]);
        }
      });
    }

    // Highlight filter in matrix
    if (this.teacherHighlightSelect) {
      this.teacherHighlightSelect.addEventListener('change', (e) => {
        this.selectedTeacherId = parseInt(e.target.value) || 0;
        this.renderMatrix();
        this.renderPersonalSchedule();
      });
    }

    // Filter Hari in matrix
    if (this.filterHariSelect) {
      this.filterHariSelect.addEventListener('change', (e) => {
        this.filterHari = e.target.value;
        this.renderMatrix();
      });
    }

    // Filter Ruang in matrix
    if (this.filterRuangSelect) {
      this.filterRuangSelect.addEventListener('change', (e) => {
        this.filterRuang = e.target.value;
        this.renderMatrix();
      });
    }

    // Teacher select in personal tab
    if (this.teacherDropdown) {
      this.teacherDropdown.addEventListener('change', (e) => {
        this.selectedTeacherId = parseInt(e.target.value) || 0;
        this.renderPersonalSchedule();
        if (this.teacherHighlightSelect) {
          this.teacherHighlightSelect.value = this.selectedTeacherId;
        }
      });
    }
  }

  toggleAvatar() {
    this.currentAvatar = this.currentAvatar === 'agus' ? 'hijab' : 'agus';
    localStorage.setItem('SELECTED_AVATAR', this.currentAvatar);
    this.renderAvatarHeader();
    this.showToast(`Karakter avatar diubah ke: ${this.currentAvatar === 'agus' ? 'Pak Guru Agus (Pixar 3D)' : 'Bu Guru Hijab ASN (Pixar 3D)'}`);
  }

  switchTab(tabName) {
    this.activeTab = tabName;
    this.navItems.forEach(n => {
      if (n.getAttribute('data-tab') === tabName) {
        n.classList.add('active');
      } else {
        n.classList.remove('active');
      }
    });

    this.tabSections.forEach(sec => {
      if (sec.id === `section-${tabName}`) {
        sec.style.display = 'block';
      } else {
        sec.style.display = 'none';
      }
    });

    if (tabName === 'matrix') this.renderMatrix();
    if (tabName === 'personal') this.renderPersonalSchedule();
    if (tabName === 'petugas') this.renderPetugasList();
    if (tabName === 'dashboard') this.renderDashboard();
  }

  // Header & Avatar rendering
  renderAvatarHeader() {
    const avatarImg = document.getElementById('headerAvatarImg');
    const avatarName = document.getElementById('headerAvatarName');
    const panelAvatarImg = document.getElementById('panelAvatarImg');
    const panelAvatarName = document.getElementById('panelAvatarName');
    const panelAvatarRole = document.getElementById('panelAvatarRole');

    const isAgus = this.currentAvatar === 'agus';
    const imgSrc = isAgus ? 'assets/images/pak_guru_agus.jpg' : 'assets/images/bu_guru_hijab.jpg';
    const nameStr = isAgus ? 'Pak Agus Gunawan, S.Pd.' : 'Ibu Guru ASN Modern';
    const roleStr = isAgus ? 'Pengawas Utama & Koordinator' : 'Tenaga Pendidik Profesional';

    if (avatarImg) avatarImg.src = imgSrc;
    if (avatarName) avatarName.textContent = nameStr;
    if (panelAvatarImg) panelAvatarImg.src = imgSrc;
    if (panelAvatarName) panelAvatarName.textContent = nameStr;
    if (panelAvatarRole) panelAvatarRole.textContent = roleStr;
  }

  render() {
    this.renderAvatarHeader();
    this.renderHeaderMeta();
    this.populateFilterDropdowns();
    this.renderDashboard();
    this.renderMatrix();
    this.renderPersonalSchedule();
    this.renderPetugasList();
    this.renderDonutGauge();
    this.renderSettingsForm();
  }

  renderHeaderMeta() {
    const instansi = this.data.instansi;
    const heroTitle = document.getElementById('heroKegiatanTitle');
    const heroInstansi = document.getElementById('heroInstansiText');
    const heroTahun = document.getElementById('heroTahunAjaranTag');
    const heroPeriode = document.getElementById('heroPeriodeTag');

    if (heroTitle) heroTitle.innerHTML = `<i class="fa-solid fa-graduation-cap"></i> ${instansi.namaKegiatan}`;
    if (heroInstansi) heroInstansi.textContent = `${instansi.namaInstansi} — Sistem Penjadwalan & Pengawasan Ujian Terpadu`;
    if (heroTahun) heroTahun.innerHTML = `<i class="fa-solid fa-calendar"></i> ${instansi.tahunAjaran}`;
    if (heroPeriode) heroPeriode.innerHTML = `<i class="fa-solid fa-clock"></i> ${instansi.periode}`;

    // Stat cards values
    document.getElementById('statTotalPetugas').textContent = this.data.petugas.length;
    document.getElementById('statTotalRuang').textContent = this.data.ruang.length;
    document.getElementById('statTotalSesi').textContent = this.data.jadwal.length;
    
    // Calculate total room slots assigned
    let totalAssignments = 0;
    this.data.jadwal.forEach(j => {
      totalAssignments += Object.keys(j.penugasan || {}).length;
    });
    const avgPerPetugas = this.data.petugas.length ? (totalAssignments / this.data.petugas.length).toFixed(1) : 0;
    document.getElementById('statAvgTugas').textContent = `${avgPerPetugas} Sesi/Guru`;
  }

  populateFilterDropdowns() {
    // Populate teacher highlight select
    if (this.teacherHighlightSelect) {
      let html = `<option value="0">-- Sorot Petugas (Semua Netral) --</option>`;
      this.data.petugas.forEach(p => {
        const isSel = p.id === this.selectedTeacherId ? 'selected' : '';
        html += `<option value="${p.id}" ${isSel}>#${p.id} - ${p.nama}</option>`;
      });
      this.teacherHighlightSelect.innerHTML = html;
    }

    // Populate personal teacher select
    if (this.teacherDropdown) {
      let html = '';
      this.data.petugas.forEach(p => {
        const isSel = p.id === this.selectedTeacherId ? 'selected' : '';
        html += `<option value="${p.id}" ${isSel}>#${p.id} - ${p.nama} (${p.nip})</option>`;
      });
      this.teacherDropdown.innerHTML = html;
    }

    // Populate Hari select
    if (this.filterHariSelect) {
      const days = [...new Set(this.data.jadwal.map(j => j.hari))];
      let html = `<option value="ALL">Semua Hari / Tanggal (${days.length} Hari)</option>`;
      days.forEach(d => {
        html += `<option value="${d}">${d}</option>`;
      });
      this.filterHariSelect.innerHTML = html;
    }

    // Populate Ruang select
    if (this.filterRuangSelect) {
      let html = `<option value="ALL">Semua Ruangan (1 s.d ${this.data.ruang.length})</option>`;
      this.data.ruang.forEach(r => {
        html += `<option value="${r.id}">${r.nama}</option>`;
      });
      this.filterRuangSelect.innerHTML = html;
    }
  }

  // ====================================================================
  // MATRIX SCHEDULE VIEW
  // ====================================================================
  renderMatrix() {
    const tableHead = document.getElementById('matrixTableHead');
    const tableBody = document.getElementById('matrixTableBody');
    if (!tableHead || !tableBody) return;

    let filteredJadwal = this.data.jadwal;
    if (this.filterHari !== 'ALL') {
      filteredJadwal = filteredJadwal.filter(j => j.hari === this.filterHari);
    }

    let activeRooms = this.data.ruang;
    if (this.filterRuang !== 'ALL') {
      const targetRoomId = parseInt(this.filterRuang);
      activeRooms = activeRooms.filter(r => r.id === targetRoomId);
    }

    // Generate Table Header
    let headHtml = `
      <tr>
        <th class="sticky-col" style="min-width: 45px;">NO</th>
        <th class="sticky-col-2" style="min-width: 150px;">HARI / TANGGAL</th>
        <th style="min-width: 50px;">KE</th>
        <th style="min-width: 110px;">WAKTU</th>
        <th style="min-width: 150px;">MATA PELAJARAN</th>
    `;

    activeRooms.forEach(r => {
      headHtml += `<th title="${r.nama} - ${r.keterangan || ''}" style="min-width: 44px; font-weight:800;">${r.id}</th>`;
    });
    headHtml += `</tr>`;
    tableHead.innerHTML = headHtml;

    // Generate Table Rows
    let bodyHtml = '';
    const teacherMap = {};
    this.data.petugas.forEach(p => { teacherMap[p.id] = p.nama; });

    filteredJadwal.forEach((sesi, index) => {
      const mapelClass = sesi.kategori || 'Umum';
      bodyHtml += `
        <tr>
          <td class="sticky-col font-bold">${index + 1}</td>
          <td class="sticky-col-2 text-left font-semibold" style="font-size: 11.5px;">${sesi.hari}</td>
          <td class="font-bold">${sesi.ke}</td>
          <td style="font-size: 11px;">${sesi.waktu}</td>
          <td class="text-left">
            <span class="badge-mapel ${mapelClass}">${sesi.mapel}</span>
          </td>
      `;

      activeRooms.forEach(r => {
        const teacherId = sesi.penugasan ? sesi.penugasan[r.id] : undefined;
        const isTarget = teacherId && (teacherId === this.selectedTeacherId);
        const cellClass = isTarget ? 'room-cell highlight-target' : 'room-cell';
        const teacherName = teacherId ? (teacherMap[teacherId] || `Petugas #${teacherId}`) : '-';

        bodyHtml += `
          <td class="${cellClass}" 
              data-sesi="${sesi.id}" 
              data-ruang="${r.id}" 
              title="Ruang ${r.id}: #${teacherId || '-'} - ${teacherName} (${sesi.mapel})"
              onclick="app.selectTeacherFromMatrix(${teacherId || 0})">
            ${teacherId || '-'}
          </td>
        `;
      });

      bodyHtml += `</tr>`;
    });

    tableBody.innerHTML = bodyHtml;

    // Update active highlight note
    const activeNote = document.getElementById('matrixActiveHighlightNote');
    if (activeNote) {
      if (this.selectedTeacherId > 0 && teacherMap[this.selectedTeacherId]) {
        activeNote.innerHTML = `Disorot: <strong style="color: #E11D48;">#${this.selectedTeacherId} - ${teacherMap[this.selectedTeacherId]}</strong> (Ditandai warna merah/pink)`;
      } else {
        activeNote.textContent = 'Semua Petugas Normal (Pilih guru di dropdown untuk menyorot)';
      }
    }
  }

  selectTeacherFromMatrix(teacherId) {
    if (!teacherId) return;
    this.selectedTeacherId = teacherId;
    if (this.teacherHighlightSelect) this.teacherHighlightSelect.value = teacherId;
    if (this.teacherDropdown) this.teacherDropdown.value = teacherId;
    this.renderMatrix();
    this.renderPersonalSchedule();
    const teacher = this.data.petugas.find(p => p.id === teacherId);
    if (teacher) {
      this.showToast(`Menyorot #${teacher.id}: ${teacher.nama}`);
    }
  }

  // ====================================================================
  // PERSONAL SCHEDULE SEARCH (Jadwal Saya)
  // ====================================================================
  renderPersonalSchedule() {
    const teacher = this.data.petugas.find(p => p.id === this.selectedTeacherId) || this.data.petugas[0];
    if (!teacher) return;

    // Update Personal Profile Card
    const personalName = document.getElementById('personalTeacherName');
    const personalNip = document.getElementById('personalTeacherNip');
    const personalRole = document.getElementById('personalTeacherRole');
    const personalAvatar = document.getElementById('personalTeacherAvatar');

    if (personalName) personalName.textContent = teacher.nama;
    if (personalNip) personalNip.textContent = `NIP. ${teacher.nip || '-'}`;
    if (personalRole) personalRole.textContent = `Nomor Urut Pengawas: #${teacher.id} | ${teacher.role || 'Petugas Pengawas'}`;
    if (personalAvatar) {
      personalAvatar.src = teacher.avatar || (this.currentAvatar === 'agus' ? 'assets/images/pak_guru_agus.jpg' : 'assets/images/bu_guru_hijab.jpg');
    }

    // Find all assignments for this teacher
    const assignments = [];
    this.data.jadwal.forEach(sesi => {
      if (sesi.penugasan) {
        Object.entries(sesi.penugasan).forEach(([roomId, tId]) => {
          if (parseInt(tId) === teacher.id) {
            assignments.push({
              sesiId: sesi.id,
              hari: sesi.hari,
              ke: sesi.ke,
              waktu: sesi.waktu,
              mapel: sesi.mapel,
              kategori: sesi.kategori || 'Umum',
              ruang: roomId
            });
          }
        });
      }
    });

    // Update Counter
    const totalTugasBadge = document.getElementById('personalTotalTugas');
    if (totalTugasBadge) totalTugasBadge.textContent = `${assignments.length} Sesi Bertugas`;

    // Render Assignment Cards
    const container = document.getElementById('personalScheduleContainer');
    if (!container) return;

    if (assignments.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: #FFF; border-radius: 16px; border: 1px dashed #CBD5E1;">
          <i class="fa-solid fa-calendar-xmark" style="font-size: 40px; color: #94A3B8; margin-bottom: 10px;"></i>
          <h3 style="font-size: 16px; font-weight: 700; color: #334155;">Belum Ada Jadwal Mengawas</h3>
          <p style="font-size: 13px; color: #64748B;">Petugas ${teacher.nama} belum terdaftar pada sesi jadwal apapun.</p>
        </div>
      `;
      return;
    }

    let html = '';
    assignments.forEach(item => {
      html += `
        <div class="schedule-card">
          <div class="schedule-card-header">
            <div>
              <div class="schedule-date"><i class="fa-regular fa-calendar-check"></i> ${item.hari}</div>
              <h3 class="schedule-mapel-title">${item.mapel}</h3>
            </div>
            <span class="schedule-sesi-badge">Sesi ${item.ke}</span>
          </div>
          
          <div class="schedule-details">
            <div class="schedule-room-badge">
              <i class="fa-solid fa-door-open"></i> Ruang ${item.ruang}
            </div>
            <div class="schedule-time-badge">
              <i class="fa-regular fa-clock"></i> ${item.waktu}
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // ====================================================================
  // PETUGAS LIST
  // ====================================================================
  renderPetugasList() {
    const container = document.getElementById('petugasListContainer');
    if (!container) return;

    // Calculate duty counts for each teacher
    const dutyCounts = {};
    this.data.jadwal.forEach(sesi => {
      if (sesi.penugasan) {
        Object.values(sesi.penugasan).forEach(tId => {
          dutyCounts[tId] = (dutyCounts[tId] || 0) + 1;
        });
      }
    });

    let html = '';
    this.data.petugas.forEach(p => {
      const isSel = p.id === this.selectedTeacherId;
      const count = dutyCounts[p.id] || 0;
      html += `
        <div class="petugas-card ${isSel ? 'is-highlighted' : ''}" onclick="app.selectTeacherFromMatrix(${p.id})">
          <div class="petugas-id-circle">${p.id}</div>
          <div class="petugas-info">
            <div class="petugas-name" title="${p.nama}">${p.nama}</div>
            <div class="petugas-nip">NIP. ${p.nip || '-'}</div>
            <div class="petugas-total-tugas"><i class="fa-solid fa-clipboard-check"></i> ${count} Sesi Tugas</div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // ====================================================================
  // DASHBOARD PREVIEW
  // ====================================================================
  renderDashboard() {
    // Renders the quick matrix preview on dashboard
    const previewBody = document.getElementById('dashboardPreviewBody');
    if (!previewBody) return;

    const teacherMap = {};
    this.data.petugas.forEach(p => { teacherMap[p.id] = p.nama; });

    let html = '';
    // Show first 4 sessions as quick glimpse
    const glimse = this.data.jadwal.slice(0, 5);
    glimse.forEach((sesi, idx) => {
      html += `
        <tr style="border-bottom: 1px solid #F1F5F9;">
          <td style="padding: 10px 12px; font-weight: 700;">${idx + 1}</td>
          <td style="padding: 10px 12px; font-weight: 600; font-size: 12px;">${sesi.hari}</td>
          <td style="padding: 10px 12px;"><span class="badge-mapel ${sesi.kategori || 'Umum'}">${sesi.mapel}</span></td>
          <td style="padding: 10px 12px; font-size: 12px;">${sesi.waktu}</td>
          <td style="padding: 10px 12px; font-weight: 700; color: #047857;">${Object.keys(sesi.penugasan || {}).length} Ruang Terplot</td>
          <td style="padding: 10px 12px;">
            <button class="btn-filter-action btn-outline-emerald" style="padding: 4px 10px; font-size: 11px;" onclick="app.switchTab('matrix')">Lihat Matriks</button>
          </td>
        </tr>
      `;
    });

    previewBody.innerHTML = html;
  }

  // ====================================================================
  // DONUT GAUGE CHART & STATS (Matching 42.4 GB gauge in screenshot)
  // ====================================================================
  renderDonutGauge() {
    const totalRooms = this.data.ruang.length;
    const totalSessions = this.data.jadwal.length;
    const maxCapacity = totalRooms * totalSessions;

    let assignedSlots = 0;
    const categoryCounts = {
      Bahasa: 0,
      MIPA: 0,
      Agama: 0,
      Lainnya: 0
    };

    this.data.jadwal.forEach(j => {
      const slots = Object.keys(j.penugasan || {}).length;
      assignedSlots += slots;
      const cat = j.kategori || 'Lainnya';
      if (cat.includes('Bahasa')) categoryCounts.Bahasa += slots;
      else if (cat.includes('MIPA') || cat.includes('TIK')) categoryCounts.MIPA += slots;
      else if (cat.includes('Agama')) categoryCounts.Agama += slots;
      else categoryCounts.Lainnya += slots;
    });

    const percent = maxCapacity > 0 ? Math.round((assignedSlots / maxCapacity) * 100) : 100;
    
    // Update donut numbers
    const bigVal = document.getElementById('donutBigVal');
    const subVal = document.getElementById('donutSubVal');
    if (bigVal) bigVal.textContent = `${percent}%`;
    if (subVal) subVal.textContent = `${assignedSlots} / ${maxCapacity} Slot Ruang`;

    // Update breakdown items
    const catBahasa = document.getElementById('statCatBahasa');
    const catMipa = document.getElementById('statCatMipa');
    const catAgama = document.getElementById('statCatAgama');
    const catLainnya = document.getElementById('statCatLainnya');

    if (catBahasa) catBahasa.textContent = `${categoryCounts.Bahasa} Slot`;
    if (catMipa) catMipa.textContent = `${categoryCounts.MIPA} Slot`;
    if (catAgama) catAgama.textContent = `${categoryCounts.Agama} Slot`;
    if (catLainnya) catLainnya.textContent = `${categoryCounts.Lainnya} Slot`;
  }

  // ====================================================================
  // SEARCH FUNCTION
  // ====================================================================
  handleSearch() {
    const q = this.searchQuery;
    if (!q) {
      this.render();
      return;
    }

    // Check if matching teacher name or ID
    const foundTeacher = this.data.petugas.find(p => 
      p.nama.toLowerCase().includes(q) || 
      String(p.id) === q || 
      (p.nip && p.nip.includes(q))
    );

    if (foundTeacher) {
      this.selectedTeacherId = foundTeacher.id;
      if (this.teacherHighlightSelect) this.teacherHighlightSelect.value = foundTeacher.id;
      if (this.teacherDropdown) this.teacherDropdown.value = foundTeacher.id;
      this.renderMatrix();
      this.renderPersonalSchedule();
    }
  }

  // ====================================================================
  // TEMPLATE DOWNLOAD (Excel XLSX, CSV, JSON)
  // ====================================================================
  downloadExcelTemplate() {
    if (typeof XLSX === 'undefined') {
      alert("Library XLSX belum dimuat. Silakan periksa koneksi internet atau gunakan ekspor JSON.");
      return;
    }

    const wb = XLSX.utils.book_new();

    // 1. Sheet Petugas
    const petugasData = [
      ["NO", "NAMA PENGAWAS", "NIP", "JABATAN", "JENIS KELAMIN"]
    ];
    this.data.petugas.forEach(p => {
      petugasData.push([p.id, p.nama, p.nip || "", p.role || "Pengawas", p.gender || "M"]);
    });
    const wsPetugas = XLSX.utils.aoa_to_sheet(petugasData);
    XLSX.utils.book_append_sheet(wb, wsPetugas, "Daftar Petugas");

    // 2. Sheet Jadwal Mengawas
    const roomHeaders = this.data.ruang.map(r => `RUANG ${r.id}`);
    const jadwalHeaders = ["NO", "HARI/TANGGAL", "SESI", "WAKTU", "MATA PELAJARAN", "KATEGORI", ...roomHeaders];
    const jadwalRows = [jadwalHeaders];

    this.data.jadwal.forEach(j => {
      const row = [j.id, j.hari, j.ke, j.waktu, j.mapel, j.kategori || "Umum"];
      this.data.ruang.forEach(r => {
        row.push(j.penugasan ? (j.penugasan[r.id] || "") : "");
      });
      jadwalRows.push(row);
    });
    const wsJadwal = XLSX.utils.aoa_to_sheet(jadwalRows);
    XLSX.utils.book_append_sheet(wb, wsJadwal, "Jadwal Mengawas");

    // 3. Sheet Informasi Instansi
    const instansiRows = [
      ["KUNCI", "NILAI"],
      ["Nama Instansi", this.data.instansi.namaInstansi],
      ["Nama Kegiatan", this.data.instansi.namaKegiatan],
      ["Tahun Ajaran", this.data.instansi.tahunAjaran],
      ["Periode", this.data.instansi.periode],
      ["Kota", this.data.instansi.kota],
      ["Tanggal Pengesahan", this.data.instansi.tanggalPengesahan],
      ["Nama Kepala / Pimpinan", this.data.instansi.namaKepala],
      ["NIP Kepala", this.data.instansi.nipKepala],
      ["Nama Ketua Panitia", this.data.instansi.namaKetua],
      ["NIP Ketua", this.data.instansi.nipKetua],
      ["Nama Sekretaris", this.data.instansi.namaSekretaris],
      ["NIP Sekretaris", this.data.instansi.nipSekretaris]
    ];
    const wsInstansi = XLSX.utils.aoa_to_sheet(instansiRows);
    XLSX.utils.book_append_sheet(wb, wsInstansi, "Pengaturan Instansi");

    // Trigger download
    const filename = `TEMPLATE_JADWAL_${this.data.instansi.namaKegiatan.replace(/[^a-zA-Z0-9]/g, '_')}.xlsx`;
    XLSX.writeFile(wb, filename);
    this.showToast(`Template Excel berhasil diunduh: ${filename}`);
  }

  downloadJSONBackup() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `SIM_JADWAL_BACKUP_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    this.showToast("Backup JSON berhasil diunduh!");
  }

  // ====================================================================
  // TEMPLATE UPLOAD & PARSER
  // ====================================================================
  handleFileUpload(file) {
    const filename = file.name.toLowerCase();
    this.showToast(`Memproses file ${file.name}...`);

    if (filename.endsWith('.json')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target.result);
          if (parsed.petugas && parsed.jadwal) {
            this.data = parsed;
            this.saveData();
            this.render();
            this.showToast("Data JSON berhasil dimuat dan diterapkan!");
          } else {
            alert("Format JSON tidak sesuai template. Pastikan memiliki objek 'petugas' dan 'jadwal'.");
          }
        } catch (err) {
          alert("Gagal membaca file JSON: " + err.message);
        }
      };
      reader.readAsText(file);
      return;
    }

    if (filename.endsWith('.xlsx') || filename.endsWith('.xls') || filename.endsWith('.csv')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          this.parseExcelWorkbook(workbook);
        } catch (err) {
          alert("Gagal mem-parsing file Excel: " + err.message);
        }
      };
      reader.readAsArrayBuffer(file);
      return;
    }

    alert("Format file tidak didukung! Harap upload file .xlsx, .xls, .csv, atau .json");
  }

  parseExcelWorkbook(workbook) {
    const sheetNames = workbook.SheetNames;
    let petugasSheet = workbook.Sheets["Daftar Petugas"] || workbook.Sheets["Petugas"] || workbook.Sheets[sheetNames[0]];
    let jadwalSheet = workbook.Sheets["Jadwal Mengawas"] || workbook.Sheets["Jadwal"] || (sheetNames.length > 1 ? workbook.Sheets[sheetNames[1]] : null);
    let instansiSheet = workbook.Sheets["Pengaturan Instansi"] || workbook.Sheets["Instansi"];

    // 1. Parse Petugas
    if (petugasSheet) {
      const petugasJson = XLSX.utils.sheet_to_json(petugasSheet, { header: 1 });
      if (petugasJson.length > 1) {
        const newPetugas = [];
        for (let i = 1; i < petugasJson.length; i++) {
          const row = petugasJson[i];
          if (row[0] && row[1]) {
            newPetugas.push({
              id: parseInt(row[0]) || (i),
              nama: String(row[1]).trim(),
              nip: row[2] ? String(row[2]).trim() : "",
              role: row[3] ? String(row[3]).trim() : "Pengawas",
              gender: row[4] ? String(row[4]).trim() : "M"
            });
          }
        }
        if (newPetugas.length > 0) {
          this.data.petugas = newPetugas;
        }
      }
    }

    // 2. Parse Jadwal
    if (jadwalSheet) {
      const jadwalJson = XLSX.utils.sheet_to_json(jadwalSheet, { header: 1 });
      if (jadwalJson.length > 1) {
        const headerRow = jadwalJson[0];
        const newJadwal = [];
        
        // Find which columns are rooms
        const roomCols = [];
        for (let colIdx = 6; colIdx < headerRow.length; colIdx++) {
          const headerName = String(headerRow[colIdx] || '');
          const match = headerName.match(/\d+/);
          const roomId = match ? parseInt(match[0]) : (colIdx - 5);
          roomCols.push({ colIdx, roomId });
        }

        // Ensure room list covers all parsed rooms
        const maxRoomId = roomCols.length > 0 ? Math.max(...roomCols.map(r => r.roomId)) : 33;
        this.data.ruang = Array.from({ length: maxRoomId }, (_, i) => ({
          id: i + 1,
          nama: `Ruang ${i + 1}`,
          kapasitas: 32,
          keterangan: `Lantai ${i < 12 ? '1' : i < 24 ? '2' : '3'}`
        }));

        for (let rIdx = 1; rIdx < jadwalJson.length; rIdx++) {
          const row = jadwalJson[rIdx];
          if (row[1] && row[4]) {
            const penugasan = {};
            roomCols.forEach(({ colIdx, roomId }) => {
              if (row[colIdx]) {
                const tId = parseInt(row[colIdx]);
                if (!isNaN(tId)) penugasan[roomId] = tId;
              }
            });

            newJadwal.push({
              id: parseInt(row[0]) || rIdx,
              hari: String(row[1]).trim(),
              ke: parseInt(row[2]) || 1,
              waktu: String(row[3] || "07.30 - 09.00").trim(),
              mapel: String(row[4]).trim(),
              kategori: String(row[5] || "Umum").trim(),
              penugasan: penugasan
            });
          }
        }

        if (newJadwal.length > 0) {
          this.data.jadwal = newJadwal;
        }
      }
    }

    // 3. Parse Instansi if available
    if (instansiSheet) {
      const instansiJson = XLSX.utils.sheet_to_json(instansiSheet, { header: 1 });
      instansiJson.forEach(row => {
        const key = String(row[0] || '').toLowerCase();
        const val = String(row[1] || '').trim();
        if (key.includes('instansi')) this.data.instansi.namaInstansi = val;
        if (key.includes('kegiatan')) this.data.instansi.namaKegiatan = val;
        if (key.includes('ajaran')) this.data.instansi.tahunAjaran = val;
        if (key.includes('periode')) this.data.instansi.periode = val;
        if (key.includes('kota')) this.data.instansi.kota = val;
        if (key.includes('kepala') && !key.includes('nip')) this.data.instansi.namaKepala = val;
        if (key.includes('nip kepala')) this.data.instansi.nipKepala = val;
      });
    }

    this.saveData();
    this.render();
    this.showToast(`Berhasil memuat template! ${this.data.petugas.length} Petugas & ${this.data.jadwal.length} Sesi diperbarui secara otomatis.`);
  }

  // ====================================================================
  // SETTINGS FORM
  // ====================================================================
  renderSettingsForm() {
    const instansi = this.data.instansi;
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('settingNamaInstansi', instansi.namaInstansi);
    setVal('settingNamaKegiatan', instansi.namaKegiatan);
    setVal('settingTahunAjaran', instansi.tahunAjaran);
    setVal('settingPeriode', instansi.periode);
    setVal('settingKota', instansi.kota);
    setVal('settingTanggalPengesahan', instansi.tanggalPengesahan);
    setVal('settingNamaKepala', instansi.namaKepala);
    setVal('settingNipKepala', instansi.nipKepala);
    setVal('settingJabatanKepala', instansi.jabatanKepala);
    setVal('settingNamaKetua', instansi.namaKetua);
    setVal('settingNipKetua', instansi.nipKetua);
    setVal('settingNamaSekretaris', instansi.namaSekretaris);
    setVal('settingNipSekretaris', instansi.nipSekretaris);
    setVal('settingCatatan', instansi.catatan);
  }

  saveSettingsFromForm() {
    const getVal = (id) => {
      const el = document.getElementById(id);
      return el ? el.value.trim() : '';
    };

    this.data.instansi = {
      namaInstansi: getVal('settingNamaInstansi') || 'Instansi Terkait',
      namaKegiatan: getVal('settingNamaKegiatan') || 'Jadwal Kegiatan & Tugas',
      tahunAjaran: getVal('settingTahunAjaran') || 'Tahun 2026/2027',
      periode: getVal('settingPeriode') || 'Periode Berjalan',
      kota: getVal('settingKota') || 'Kota',
      tanggalPengesahan: getVal('settingTanggalPengesahan') || 'Hari Ini',
      namaKepala: getVal('settingNamaKepala') || 'Nama Pimpinan',
      nipKepala: getVal('settingNipKepala') || '',
      jabatanKepala: getVal('settingJabatanKepala') || 'Kepala Instansi',
      namaKetua: getVal('settingNamaKetua') || 'Ketua Panitia',
      nipKetua: getVal('settingNipKetua') || '',
      jabatanKetua: 'Ketua Panitia',
      namaSekretaris: getVal('settingNamaSekretaris') || 'Sekretaris',
      nipSekretaris: getVal('settingNipSekretaris') || '',
      jabatanSekretaris: 'Sekretaris Panitia',
      catatan: getVal('settingCatatan') || ''
    };

    this.saveData();
    this.render();
    this.closeModal('settingsModal');
    this.showToast("Pengaturan instansi berhasil disimpan!");
  }

  // ====================================================================
  // MODALS
  // ====================================================================
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('open');
    }
  }

  // ====================================================================
  // PRINT LAYOUTS (Cetak Resmi & Cetak Kartu Pribadi)
  // ====================================================================
  printMasterSchedule() {
    window.print();
  }

  printTeacherCard() {
    this.switchTab('personal');
    setTimeout(() => {
      window.print();
    }, 250);
  }

  // ====================================================================
  // TOAST NOTIFICATION
  // ====================================================================
  showToast(message) {
    let toast = document.getElementById('appToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'appToast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #047857;
        color: #FFFFFF;
        padding: 14px 22px;
        border-radius: 9999px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        font-size: 13.5px;
        font-weight: 700;
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      `;
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';

    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.style.transform = 'translateY(100px)';
      toast.style.opacity = '0';
    }, 3200);
  }
}

// Global App instance
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new JadwalApp();
});
