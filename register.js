// Constants - Array or individual variables.
const TAX_PERCENTAGE = 6.5;
const WA_DISCOUNT = 30;
const TIME_DISCOUNT = 3;
const COURSE_DISCOUNT = 10;
const GRAD_CREDIT = 100;
const GPA_CREDIT = 250;
// Course Fee
// I can create a custom object and I can save course fee
// Array of fees, array of course
// Fees
// 1 Arrays - 
// NAME
// FEE
// MERN - 0, PYTHON 1, SQL 2, JAVA 3, OTHER 4
const COURSE_FEE = [4750, 3250, 1500, 4000, 3000];

let state;
let country; 
let isMernSelected;
let isPythonSelected;
let isJavaSelected;
let isSqlSelected;
let isOtherSelected;
let timing;

function getInput()
{
// Get all the input paramaters - use document DOM
// assign this input params to a variable
    state = document.getElementById("state").value;
    country = document.getElementById("country").value; 
    isMernSelected = document.getElementById("selectMern").checked;
    isPythonSelected = document.getElementById("selectPython").checked;
    isJavaSelected = document.getElementById("selectJava").checked;
    isSqlSelected = document.getElementById("selectSql").checked;
    isOtherSelected = document.getElementById("selectOther").checked;
    timing = document.getElementsByName("timing");
    isMorning = timing[0].checked;
    isNoon = timing[1].checked;
    isEvening = timing[2].checked;
    gradB = document.getElementById("gradB").value;
    uGpa = Number(document.getElementById("uGpa").value);
}

function computeFee(feeBeforeTax, selectedCourses)
{
    if (isMernSelected)
    {
        feeBeforeTax = feeBeforeTax + COURSE_FEE[0];
        selectedCourses.push(`MERN : $${COURSE_FEE[0]}`);
    }
    
    if (isPythonSelected)
    {
        feeBeforeTax = feeBeforeTax + COURSE_FEE[1];
        selectedCourses.push(`PYTHON : $${COURSE_FEE[1]}`);
    }
    
    if (isSqlSelected)
    {
        feeBeforeTax = feeBeforeTax + COURSE_FEE[2];
        selectedCourses.push(`SQL : $${COURSE_FEE[2]}`);
    }
    
    if (isJavaSelected)
    {
        feeBeforeTax = feeBeforeTax + COURSE_FEE[3];
        selectedCourses.push(`JAVA : $${COURSE_FEE[3]}`);
    }
    
    if (isOtherSelected)
    {
        feeBeforeTax = feeBeforeTax + COURSE_FEE[4];
        selectedCourses.push(`OTHER : $${COURSE_FEE[4]}`);
    }

    return feeBeforeTax;
}

function processForm()
{
getInput();
let selectedCourses = [];
let feeBeforeTax = 0;
feeBeforeTax = computeFee(feeBeforeTax, selectedCourses);
let totalBeforeDiscounts = feeBeforeTax;
console.log(totalBeforeDiscounts);
// Calculate Discounts
let appliedDiscounts = [];

// In state
if (state === "WA" && country === "USA")
{
    let discountReason = "In State Discount";
    let discount = (feeBeforeTax * WA_DISCOUNT) / 100;
    feeBeforeTax = feeBeforeTax - discount;
    appliedDiscounts.push(`${discountReason} : $${discount}`);
}

// Morning or Evening
if (isMorning || isEvening)
{
    let discountReason = "Selected Time - Morning or Evening - Discount";
    let discount = (feeBeforeTax * TIME_DISCOUNT) / 100;
    feeBeforeTax = feeBeforeTax - discount;
    appliedDiscounts.push(`${discountReason} : $${discount}`);
}

// SQL AND JAVA
if (isSqlSelected && isJavaSelected)
{
    let discountReason = "SQL or JAVA discount";
    let discount = (feeBeforeTax * COURSE_DISCOUNT) / 100;
    feeBeforeTax = feeBeforeTax - discount;
    appliedDiscounts.push(`${discountReason} : $${discount}`);
}

// Grad credit
if (!gradB)
{
    let discountReason = "GRAD credit";
    let discount = GRAD_CREDIT;
    feeBeforeTax = feeBeforeTax - discount;
    appliedDiscounts.push(`${discountReason} : $${discount}`);
}

// GPA credit
if (uGpa > 3.25)
{
    let discountReason = "GPA credit";
    let discount = GPA_CREDIT;
    feeBeforeTax = feeBeforeTax - discount;
    appliedDiscounts.push(`${discountReason} : $${discount}`);
}

console.log(appliedDiscounts);
console.log(feeBeforeTax);


// Tax
// After Tax
let tax = (feeBeforeTax * TAX_PERCENTAGE) / 100;
let feeAfterTax = feeBeforeTax + tax;

// Course Selected
resultElement = document.getElementById("courseSelected");
resultElement.innerText = 'Course Selected';
for(let val of selectedCourses)
{
    let element = document.createElement('p');
    element.innerText = val;
    resultElement.appendChild(element);
}


// Fee before Discounts
// feeBeforeDiscounts
resultElement = document.getElementById('feeBeforeDiscounts');
resultElement.innerText = `Fee Before Discounts $${totalBeforeDiscounts}`;

// Discounts Applied
resultElement = document.getElementById("discountApplied");
resultElement.innerText = 'Discounts Applied';
for(let val of appliedDiscounts)
{
    let element = document.createElement('p');
    element.innerText = val;
    resultElement.appendChild(element);
}

// Total After discounts Result Courses - Div 
resultElement = document.getElementById('result1');
resultElement.innerText = `Fee Before TAX after Discounts $${feeBeforeTax}`;

// Result Discounts 
// resultElement = document.getElementById('result1');
// resultElement.innerText = `Fee Before TAX $${feeBeforeTax}`;

// Result Tax 
resultElement = document.getElementById('result3');
resultElement.innerText = `TAX $${tax}`;

// Result Final Amount
resultElement = document.getElementById('result4');
resultElement.innerText = `Fee After TAX $${feeAfterTax}`;

}