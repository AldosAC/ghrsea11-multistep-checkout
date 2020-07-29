class SignUpView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  onChangeHandler(event) {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  onSubmitHandler(event) {
    let { toNext, submitData } = this.props;
    let submitPath = '/signup';

    event.preventDefault();
    submitData(this.state, submitPath);
    this.resetState();
    toNext();
  }

  resetState() {
    this.setState({ name: '', email: '', password: '' });
  }

  render () {
    let { name, email, password } = this.state;

    return (
      <div>
        <h3>Sign Up</h3>
        <form onSubmit={this.onSubmitHandler}>
          <label>Name</label>
          <input 
          type="text" 
          name="name"
          onChange={this.onChangeHandler} 
          value={name}
          />

          <label>Email</label>
          <input 
          type="text" 
          name="email"
          onChange={this.onChangeHandler} 
          value={email}
          />

          <label>Password</label>
          <input 
          type="text" 
          name="password"
          onChange={this.onChangeHandler} 
          value={password}
          />

          <button>Next</button>

        </form>
      </div>
    );
  }
}

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      view: "index"
    }
    this.toSignUpView = this.toSignUpView.bind(this);
    this.toShippingView = this.toShippingView.bind(this);
    this.toBillingView = this.toBillingView.bind(this);
    this.completeOrder = this.completeOrder.bind(this);
  }

  toSignUpView(event) {
    this.setState({ view: "sign-up"})
  }

  toShippingView(event) {

    this.setState({ view: "shipping" })
  }

  toBillingView(event) {
    
    this.setState({ view: "billing" })
  }

  completeOrder(event) {

    this.setState({ view: "index" })
  }

  submitData(data, path) {
    console.log(`Submit ${JSON.stringify(data)} to ${path}`);
  }

  renderView() {
    let { view } = this.state;

    if (view === "index") {
      return (
        <button onClick={this.toSignUpView} >Checkout</button>
      )
    } else if (view === "sign-up") {
      return (
        <SignUpView 
        toNext={this.toShippingView} 
        submitData={this.submitData} 
        />
      )
    } else if (view === "shipping") {
      return (
        <div>
          <h1>Shipping Infortmation</h1>
          <button onClick={this.toBillingView}>Next</button>
        </div>
      )
    } else if (view === "billing") {
      return (
        <div>
          <h1>Billing Information</h1>
          <button onClick={this.completeOrder}>Place Order</button>
        </div>
      )
    }
  }

  render () {
    return this.renderView();
  }
};

ReactDOM.render(<App />, document.getElementById("app"));