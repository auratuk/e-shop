(function(){
    const loginModal = `
        <div class="login-wrapper">
            <div class="login">
                <button class="login-close-btn">&times;</button>
                <div class="login-content">
                    <h1>Log in</h1>
                    <div class="login-content-item">
                        <label>Email</label>
                        <input type="text" placeholder="Enter email">
                    </div>
                    <div class="login-content-item">
                        <label>Password</label>
                        <input type="password" placeholder="Enter password">
                    </div>
                    <div class="login-content-item">
                        <input type="checkbox">
                        <label>Remember me</label>
                    </div>
                    <div class="login-content-item">
                        <button>Let me in!</button>
                    </div>
                    <div class="login-content-item">
                        <a href="#" target="_blank">Forgot password?</a>
                    </div>
                </div>
            </div>
        </div> `

    document.body.insertAdjacentHTML('afterbegin', loginModal);

    const loginContainer = document.querySelector(".login-wrapper");

    document.querySelector(".login-btn").addEventListener("click", () =>{
        loginContainer.style.display = "block";
    });

    document.querySelector(".login-close-btn").addEventListener("click", () =>{
        loginContainer.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if(e.target === loginContainer){
            loginContainer.style.display = "none";
        }
    })
})();