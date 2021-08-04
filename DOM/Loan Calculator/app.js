//listen for submit
document.querySelector('#loan-form').addEventListener('submit', function (e) {
    //Hide results
    document.querySelector('#results').style.display = 'none';
    //Show loading
    document.querySelector('#loading').style.display = 'block';

    setTimeout(calculateResults, 2000)
    e.preventDefault();
});

function calculateResults() {

    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');
    //Input
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;
    //Result
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal * x * calculatedInterest) / (x - 1);
    //Check infinity
    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2); //Giới hạn số thập phân
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2);

        //Show results and hide loading
        document.querySelector('#results').style.display = 'block';
        document.querySelector('#loading').style.display = 'none';
    } else {
        showError('Please check your number');
    }
}

//Show Error
function showError(error) {
    //Show results and hide loading
    document.querySelector('#loading').style.display = 'none';
    //Get card element to show error inside
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    //Create error div
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));
    //Insert error
    card.insertBefore(errorDiv, heading); //Thêm vào trước (tên element cần thêm, chổ cần chèn lên trước)
    //Clear error after few seconds -> improve UX
    setTimeout(clearError, 3000);
}

//Clear error
function clearError() {
    document.querySelector('.alert').remove();
}