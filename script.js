function calculatePerformance() {
    const gender = document.getElementById('gender').value;
    const age = Number(document.getElementById('age').value);
    const height = Number(document.getElementById('height').value);
    const weight = Number(document.getElementById('weight').value);
    const steps = Number(document.getElementById('steps').value);
    const goalAdjustment = Number(document.getElementById('goal').value);
    
    if (!age || !height || !weight) return;

    // 1. Bilimsel BMR (Bazal Metabolizma)
    let bmr = (gender === 'male') 
        ? (10 * weight) + (6.25 * height) - (5 * age) + 5 
        : (10 * weight) + (6.25 * height) - (5 * age) - 161;

    // 2. NEAT (Adım Kalorisi) - Kilo ve hareket eksenli
    const neat = weight * steps * 0.00055;

    // 3. TDEE ve Hedef Kalori
    const maintenance = bmr + neat;
    const targetKcal = maintenance - goalAdjustment;

    // 4. Makro Dağılımı (Hipertrofi Odaklı: 2.2g Protein)
    const proteinG = weight * 2.2; 
    const fatG = weight * 0.8;
    const carbG = (targetKcal - (proteinG * 4) - (fatG * 9)) / 4;

    document.getElementById('result').innerHTML = `
        <div class="res-box">
            <div class="metric-card">
                <label>Günlük Metabolik Durum</label>
                <div style="display:flex; justify-content:space-between;">
                    <span>BMR: ${bmr.toFixed(0)} kcal</span>
                    <span>Aktivite: +${neat.toFixed(0)} kcal</span>
                </div>
            </div>

            <div class="metric-card" style="border-left-color: #38bdf8; text-align:center;">
                <label>Hedef Günlük Kalori Alımı</label>
                <div style="font-size: 32px; font-weight: 900; color: var(--primary);">${targetKcal.toFixed(0)}</div>
                <small style="color:#94a3b8;">Haftalık Beklenen Değişim: ${((goalAdjustment * 7) / 7700).toFixed(2)} kg</small>
            </div>

            <div class="macro-box">
                <div class="macro-card">
                    <span>PROTEİN</span>
                    <strong style="color:var(--primary);">${proteinG.toFixed(0)}g</strong>
                </div>
                <div class="macro-card">
                    <span>KARB.</span>
                    <strong>${carbG.toFixed(0)}g</strong>
                </div>
                <div class="macro-card">
                    <span>YAĞ</span>
                    <strong>${fatG.toFixed(0)}g</strong>
                </div>
            </div>
            
            <div style="margin-top:15px; font-size:11px; color:#64748b; text-align:center;">
                *Pelland 2024 Hipertrofi Standartları Uygulanmıştır.
            </div>
        </div>
    `;
}
