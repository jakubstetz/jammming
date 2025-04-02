function LoginIndicator({userInfo: {display_name, images}}) {
  return (
    <div id="login-indicator">
      <img src={images ? images[0].url : ''} />
      <div>
        <p>Logged in on Spotify as:</p>
        <h2>{display_name ? display_name : ''}</h2>
      </div>
    </div>
  );
}

export default LoginIndicator;