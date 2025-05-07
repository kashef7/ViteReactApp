import  '../css/LoginPage.css';

export default function LoginPage(){
        return (
                
                <div className='LoginPageBody'>
                <div className='loginBox'>
                        <input type='text' placeholder='Username or Email' className='usernameInput'></input>
                        <input type='password' placeholder='Password' className='passwordInput'></input>
                        <button className='loginButton'>Login</button>
                </div>
                </div>
        );
};

