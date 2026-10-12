function tampilkanHasilPG() {
            document.getElementById('quizPGArea').style.display = 'none';
            document.getElementById('resultPGArea').style.display = 'block';
            
            // 1. Hitung Skor Akhir
            let nilaiAkhir = Math.round(scorePG);
            document.getElementById('finalScore').innerHTML = nilaiAkhir;
            
            // 2. LOGIKA TINDAK LANJUT (KATEGORI SKOR)
            let kategori = "";
            let pesanTindakLanjut = "";
            let warnaSkor = "";

            if (nilaiAkhir >= 86) {
                kategori = "🌟 Sangat Baik";
                pesanTindakLanjut = "Luar biasa! Kamu sudah seperti ahli listrik pesisir. Kamu siap mempresentasikan Projek Lampu Pintarmu!";
                warnaSkor = "#28a745"; // Hijau
                tembakConfetti(); setTimeout(tembakConfetti, 1000);
            } else if (nilaiAkhir >= 71) {
                kategori = "👍 Baik";
                pesanTindakLanjut = "Kerja bagus, Ale! Kamu sudah paham konsepnya, tinggal ulangi sedikit materi yang masih salah.";
                warnaSkor = "#00b4d8"; // Biru
                tembakConfetti();
            } else if (nilaiAkhir >= 56) {
                kategori = "⚠️ Cukup";
                pesanTindakLanjut = "Poinmu lumayan! Yuk, baca lagi materi Hukum Ohm di modul dan perbaiki dokumentasi projekmu.";
                warnaSkor = "#ffb703"; // Kuning
            } else {
                kategori = "📚 Perlu Bimbingan";
                pesanTindakLanjut = "Jangan menyerah! Silakan ulangi baca materi dari awal dan minta pendampingan gurumu ya.";
                warnaSkor = "#dc3545"; // Merah
            }

            // Ubah warna angka skor sesuai kategori
            document.getElementById('finalScore').style.color = warnaSkor;

            // 3. Render Kotak Hasil & Pembahasan
            const reviewBox = document.getElementById('reviewContainer');
            reviewBox.innerHTML = `
                <div style="background: ${warnaSkor}20; border: 2px solid ${warnaSkor}; padding: 15px; border-radius: 10px; margin-bottom: 20px; text-align: center;">
                    <h2 style="color: ${warnaSkor}; margin: 0 0 10px 0;">Kategori: ${kategori}</h2>
                    <p style="margin: 0; font-weight: 600; color: #444;">Tindak Lanjut: ${pesanTindakLanjut}</p>
                </div>
            `;
            
            pgData.forEach((q, i) => {
                const isCorrect = ansPG[i] === q.ans;
                const statusClass = isCorrect ? 'benar' : 'salah';
                const statusTxt = isCorrect ? '✅ BENAR' : '❌ SALAH';
                
                let html = `
                    <div class="review-item ${statusClass}">
                        <div style="font-weight:600; margin-bottom:8px;">${i+1}. ${q.q}</div>
                        <div style="font-size:0.9rem;"><strong>Jawabanmu:</strong> ${q.opts[ansPG[i]]} <em>(${statusTxt})</em></div>`;
                if (!isCorrect) html += `<div style="font-size:0.9rem; color:#dc3545; margin-top:5px;"><strong>Kunci:</strong> ${q.opts[q.ans]}</div>`;
                html += `<div class="review-feedback">💡 ${q.fb}</div></div>`;
                reviewBox.innerHTML += html;
            });
        }