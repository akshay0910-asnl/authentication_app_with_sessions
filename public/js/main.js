(() => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logout');

    const navigateToRoute = (href) => {
        let link = document.createElement('a');
        link.setAttribute("href", href);
        link.click();
        link.remove();
    };

    if (registerForm) {
        registerForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const elements = registerForm.elements;
            const { user_firstname, user_lastname, user_email, user_password } = elements;
            const postData = { firstName: user_firstname.value, lastName: user_lastname.value, 
                email: user_email.value, password: user_password.value };

            try{    
                const response = await fetch('/api/register', {
                    method: "POST",
                    mode: "same-origin",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: "follow",
                    referrerPolicy: "no-referrer",
                    body: JSON.stringify(postData),
                });
                if(response.status === 200){
                    const finalResponse = await response.json();
                    navigateToRoute('/login');
                }
                else{
                    throw new Error('Error during registration');
                }
            }
            catch(error){
                alert('Error during registration');
            }

        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const elements = loginForm.elements;
            const { user_email, user_password } = elements;
            const postData = { email: user_email.value, password: user_password.value };

            try{    
                const response = await fetch('/api/login', {
                    method: "POST",
                    mode: "same-origin",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: "follow",
                    referrerPolicy: "no-referrer",
                    body: JSON.stringify(postData),
                });
                if(response.status === 200){
                    const finalResponse = await response.json();
                    navigateToRoute('/');
                }
                else{
                    throw new Error('Error during login');
                }
            }
            catch(error){
                alert('Error during login');
            }

        });
    }

    if(logoutButton){
        logoutButton.addEventListener('click', async function (event) {
            
            try{    
                const response = await fetch('/api/logout', {
                    method: "GET",
                    mode: "same-origin",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: "follow",
                    referrerPolicy: "no-referrer",
                    
                });
                if(response.status === 200){
                    const finalResponse = await response.json();
                    navigateToRoute('/login');
                }
                else{
                    throw new Error('Error during logout');
                }
            }
            catch(error){
                alert('Error during logout');
            }

        });
    }

})();