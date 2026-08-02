const p = document.getElementById('text');
console.log(p);
p.style.color = 'red';

const pclass = document.getElementsByClassName('text')[0];
console.log(pclass);

const pq = document.querySelector('.text'); // selects the first instance ig
console.log(pq);

const qall = document.querySelectorAll('.text');
console.log(qall); //gives node list
//use index also

const c = document.querySelector('.create');
c.classList = 'divElement';

const cp = document.createElement('input');

c.append(cp);
p.remove();
