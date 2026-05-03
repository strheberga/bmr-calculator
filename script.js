function calculateAll() {
    // Verileri çekme
    const gender = document.getElementById('gender').value;
    const age = parseFloat(document.getElementById('age').value);
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const steps = parseFloat(document.getElementById('steps').value) || 0;
    const resultDiv = document.getElementById('result');

    // Boş alan kontrolü
    if (!age || !height || !weight) {
        resultDiv.innerHTML = "<p style='color:red;'>Lütfen yaş, boy ve kilo alanlarını doldurun.</p>";
        return;
    }

    // 1. BMR Hesaplama (Mifflin-St Jeor)
    let bmr;
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // 2. Adım Kalorisi (Kilo * Adım * 0.0005)
    // Bu formül kişinin kilosuna göre adım başı yaktığı enerjiyi tahmin eder.
    const stepCalories = weight * steps * 0.0005;

    // 3. Toplam
    const total = bmr + stepCalories;

    // Sonuçları ekrana yazdırma
    resultDiv.innerHTML = `
        <div><strong>Bazal Metabolizma:</strong> ${bmr.toFixed(0)} kcal</div>
        <div><strong>Adım Aktivitesi:</strong> +${stepCalories.toFixed(0)} kcal</div>
        <div class="total-kcal">Günlük Tahmini İhtiyaç: ${total.toFixed(0)} kcal</div>
    `;
}
