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
  }

  onChangeHandler(event) {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  onSubmitHandler(event) {

  }

  render () {
    let { name, email, password } = this.state;

    return (
    <form>
      <label value="Name" />
      <input 
      type="text" 
      name="name"
      onChange={this.onChangeHandler} 
      value={name}
      />

      <label value="Email" />
      <input 
      type="text" 
      name="email"
      onChange={this.onChangeHandler} 
      value={email}
      />

      <label value="Email" />
      <input 
      type="text" 
      name="password"
      onChange={this.onChangeHandler} 
      value={password}
      />


    </form>
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

  renderView() {
    let { view } = this.state;

    if (view === "index") {
      return (
        <button onClick={this.toSignUpView} >Checkout</button>
      )
    } else if (view === "sign-up") {
      return (
        <SignUpView toNext={this.toShippingView} />
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