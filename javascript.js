/* ---------------------------------------------
   1. FORM SUBMIT + 5. AGE VERIFICATION
--------------------------------------------- */
var form = document.getElementById('reserve');
var formMessage = document.getElementById('form-message');
var discountMessage = document.getElementById('discount-message');

form.addEventListener('submit', function (e) {
  e.preventDefault(); // stop the page from refreshing

  var username = document.getElementById('name').value.trim();
  var email = document.getElementById('email').value.trim();

  if (username === '' || email === '') {
    formMessage.textContent = 'Please fill in both your name and email.';
    formMessage.className = 'form-message error';
    discountMessage.textContent = '';
    return;
  }

  formMessage.textContent = 'Thank you for visiting, ' + username + '! We will contact you at ' + email + '.';
  formMessage.className = 'form-message success';

  // Age check (optional field)
  var birthText = document.getElementById('birth-year').value.trim();
  if (birthText === '') {
    discountMessage.textContent = '';
    return;
  }

  var birthYear = parseInt(birthText, 10); // "2002" -> 2002
  if (isNaN(birthYear) || birthYear < 1900 || birthYear > 2026) {
    discountMessage.textContent = 'Please enter a valid 4-digit birth year.';
    discountMessage.className = 'form-message error';
    return;
  }

  var age = 2026 - birthYear;
  if (age >= 60) {
    discountMessage.textContent = 'Age ' + age + ': you qualify for our senior discount!';
    discountMessage.className = 'form-message success';
  } else if (age >= 18 && age <= 25) {
    discountMessage.textContent = 'Age ' + age + ': you qualify for our student discount!';
    discountMessage.className = 'form-message success';
  } else {
    discountMessage.textContent = 'Age ' + age + ': no age-based discount applies, but thanks for asking!';
    discountMessage.className = 'form-message';
  }
});

/* ---------------------------------------------
   2. TABLE ROW HIGHLIGHT
--------------------------------------------- */
var rows = document.querySelectorAll('tbody tr');

rows.forEach(function (row) {
  row.addEventListener('mouseover', function () {
    row.style.backgroundColor = 'var(--row-hover)';
  });
  row.addEventListener('mouseout', function () {
    row.style.backgroundColor = ''; // back to normal
  });
});

/* ---------------------------------------------
   3. LIGHT / DARK MODE
--------------------------------------------- */
document.getElementById('theme-toggle').addEventListener('click', function () {
  document.body.classList.toggle('dark');
});

/* ---------------------------------------------
   4. ORDER TOTAL
--------------------------------------------- */
var checks = document.querySelectorAll('.order-check');
var totalEl = document.getElementById('total');

function updateTotal() {
  var total = 0;
  checks.forEach(function (box) {
    if (box.checked) {
      total += parseFloat(box.dataset.price);
    }
  });
  totalEl.textContent = 'Total: $' + total.toFixed(2);
}

checks.forEach(function (box) {
  box.addEventListener('change', updateTotal);
});

/* ---------------------------------------------
   6. READ MORE / READ LESS
--------------------------------------------- */
var readBtn = document.getElementById('read-more-btn');
var storyMore = document.getElementById('story-more');

readBtn.addEventListener('click', function () {
  storyMore.hidden = !storyMore.hidden;
  readBtn.textContent = storyMore.hidden ? 'Read More' : 'Read Less';
});

/* ---------------------------------------------
   7. MENU FILTER
--------------------------------------------- */
var filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    var filter = btn.dataset.filter;

    rows.forEach(function (row) {
      if (filter === 'all' || row.dataset.category === filter) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });

    filterBtns.forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
  });
});

/* ---------------------------------------------
   8. OPENING STATUS
--------------------------------------------- */
var statusEl = document.getElementById('status');
var hour = new Date().getHours();

if (hour >= 8 && hour < 21) {
  statusEl.textContent = 'We are Open!';
  statusEl.classList.add('open');
} else {
  statusEl.textContent = 'Closed - Open at 8 AM';
  statusEl.classList.add('closed');
}

/* ---------------------------------------------
   9. CHARACTER COUNTER
--------------------------------------------- */
var notes = document.getElementById('special-notes');
var charCount = document.getElementById('char-count');

notes.addEventListener('input', function () {
  var remaining = 100 - notes.value.length;
  charCount.textContent = remaining + ' characters remaining';
});