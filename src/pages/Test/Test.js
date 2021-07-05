import { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";

class Test extends Component {

  render () {
    return <div>
      <Modal 
        title="Test"
        content="123123123"
        show={false}/>
      <h1>123123flsdjflajsdlfjsldjflskjflsjflkasdjfsaidjflksfmlaf</h1>
    </div>
  }
}

export default Test;