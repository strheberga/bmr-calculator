function calculatePerformance() {
    const gender = document.getElementById('gender').value;
    const age = Number(document.getElementById('age').value);
    const height = Number(document.getElementById('height').value);
    const weight = Number(document.getElementById('weight').value);
    const steps = Number(document.getElementById('steps').value);
    const goalAdjustment = Number(document.getElementById('goal').value);
    
    if (!age || !height || !weight) return;

    // 1. BMR Hesaplama
    let bmr = (gender === 'male') 
        ? (10 * weight) + (6.25 * height) - (5 * age) + 5 
        : (10 * weight) + (6.25 * height) - (5 * age) - 161;

    // 2. Aktivite (NEAT)
    const neat = weight * steps * 0.00055;
    const maintenance = bmr + neat;
    const targetKcal = maintenance - goalAdjustment;

    // 3. Dinamik Protein Önerisi
    // Kilo verme (goalAdjustment > 0) ise 2g, koruma veya kilo alma ise 1.6g
    let proteinRatio = (goalAdjustment > 0) ? 2.0 : 1.6;
    
    const proteinG = weight * proteinRatio;
    const fatG = weight * 0.8; // Sağlıklı yağ dengesi
    const carbG = (targetKcal - (proteinG * 4) - (fatG * 9)) / 4;

    document.getElementById('result').innerHTML = `
        <div class="res-box" style="margin-top:20px;">
            <div class="metric-card">
                <label>Günlük Özet</label>
                <div style="display:flex; justify-content:space-between; font-size: 14px;">
                    <span>BMR: ${bmr.toFixed(0)} kcal</span>
                    <span>Adım: +${neat.toFixed(0)} kcal</span>
                </div>
            </div>

            <div class="metric-card" style="border-left-color: #38bdf8; text-align:center;">
                <label>Hedef Kalori Alımı</label>
                <div style="font-size: 32px; font-weight: 900; color: var(--primary);">${targetKcal.toFixed(0)}</div>
                <small style="color:#94a3b8;">Haftalık Değişim: ${((goalAdjustment * 7) / 7700).toFixed(2)} kg</small>
            </div>

            <div class="macro-box">
                <div class="macro-card">
                    <span style="color:${proteinRatio === 2.0 ? '#00ff88' : '#cbd5e1'}">PROTEİN (${proteinRatio}g)</span>
                    <strong style="color:var(--primary); font-size: 18px;">${proteinG.toFixed(0)}g</strong>
                </div>
                <div class="macro-card">
                    <span>KARBOHİDRAT</span>
                    <strong style="font-size: 18px;">${carbG.toFixed(0)}g</strong>
                </div>
                <div class="macro-card">
                    <span>YAĞ</span>
                    <strong style="font-size: 18px;">${fatG.toFixed(0)}g</strong>
                </div>
            </div>
            
            <div style="margin-top:15px; font-size:10px; color:#64748b; text-align:center; line-height:1.4;">
                Kilo verme hedeflerinde kas koruması için 2.0g/kg protein, koruma/bulk dönemlerinde ise 1.6g/kg protein baz alınmıştır.
            </div>
        </div>
    `;
}
