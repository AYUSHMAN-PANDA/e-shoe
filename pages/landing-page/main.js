const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const signInForm = document.querySelector('#sign-in-form');
const email = document.getElementById('email');
const password = document.getElementById('pass');
const err_msg = document.querySelector('.msg');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

signInForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
	e.preventDefault();
	const input_email = email.value;
	const input_password = password.value;

	if (input_email === '' || input_password === '') {
		err_msg.classList.add('alert');
		err_msg.classList.add('alert-danger');
		err_msg.innerHTML = `Please enter all fields`;
		setTimeout(() => {
			err_msg.innerHTML = '';
			err_msg.classList.remove('alert');
		}, 3000);
	} else {
		// console.log(input_email, input_password);
		fetch('localhost:3000/users')
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err))
	}

}