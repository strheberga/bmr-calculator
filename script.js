function calculateBMR() {
    const gender = document.getElementById('gender').value;
    const age = parseFloat(document.getElementById('age').value);
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const resultDiv = document.getElementById('result');

    if (isNaN(age) || isNaN(height) || isNaN(weight)) {
        resultDiv.innerHTML = "Lütfen tüm alanları doğru doldurun.";
        return;
    }

    let bmr;

    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    resultDiv.innerHTML = `<h3>Günlük BMR: ${bmr.toFixed(2)} kcal</h3>`;
}