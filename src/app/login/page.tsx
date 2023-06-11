export default function Login() {
  return (
    <form>
      <div className="h-screen flex flex-col justify-center items-center space-y-2">
        <h1>Sign In</h1>
        <input type="email" placeholder="Email" className="input input-bordered w-full max-w-xs" />
        <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
        <button type="submit" className="btn btn-primary">Login</button>
      </div>
    </form>
  )
}