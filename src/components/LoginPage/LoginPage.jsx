function LoginPage({loginHandler}) {
  return (
    <div id="login-page" className="flex-center">
      <div>
        <header>
          <h1 className="centered-text">Ja<span>mmm</span>ing</h1>
        </header>
        <main className="flex-center">
          <p className="centered-text">Please log in to Spotify to use this application.</p>
          <img src="src/images/spotifyLogo.png"/>
          <button onClick={loginHandler}>Log in</button>
        </main>
      </div>
    </div>
  );
}

export default LoginPage;