function calculateAll() {
    // Inputlardan değerleri al ve sayıya çevir
    const gender = document.getElementById('gender').value;
    const age = Number(document.getElementById('age').value);
    const height = Number(document.getElementById('height').value);
    const weight = Number(document.getElementById('weight').value);
    const steps = Number(document.getElementById('steps').value) || 0;
    
    const resultDiv = document.getElementById('result');

    // Temel veri kontrolü
    if (age <= 0 || height <= 0 || weight <= 0) {
        resultDiv.innerHTML = "<p style='color:red;'>Lütfen geçerli yaş, boy ve kilo girin.</p>";
        return;
    }

    // 1. BMR Hesaplama
    let bmr = 0;
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // 2. Adım Kalorisi Hesaplama
    // Kilo başına harcanan enerji katsayısını kullanıyoruz
    const stepCalories = weight * steps * 0.0005;

    // 3. Toplam (BMR + Adım Kalorisi)
    // Burada matematiksel toplama yapıldığından emin oluyoruz
    const totalMaintenance = bmr + stepCalories;

    // Sonucu ekrana bas
    resultDiv.innerHTML = `
        <div style="margin-bottom: 10px;">
            <span>Bazal Metabolizma:</span> 
            <span style="float:right;"><strong>${bmr.toFixed(0)} kcal</strong></span>
        </div>
        <div style="margin-bottom: 10px;">
            <span>Adım Aktivitesi (${steps.toLocaleString()} adım):</span> 
            <span style="float:right; color: #1a73e8;"><strong>+${stepCalories.toFixed(0)} kcal</strong></span>
        </div>
        <div class="total-kcal" style="border-top: 2px solid #ddd; padding-top: 10px; margin-top: 10px; text-align: center;">
            <div style="font-size: 0.9em; color: #666;">Günlük Toplam İhtiyaç</div>
            <div style="font-size: 1.5em; color: #28a745;"><strong>${totalMaintenance.toFixed(0)} kcal</strong></div>
        </div>
    `;
}
