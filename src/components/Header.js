import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Rxjs from 'rxjs';


export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
          isMin: false
        }
      }
    
      componentDidMount(){
        Rxjs.Observable.fromEvent(window, 'scroll')
        .debounceTime(20)
        .subscribe(e => {
          if(window.scrollY > 15) {
            this.setState({ isMin:true })
          } else {
            this.setState({ isMin: false })
          }
        })
      }

    render() {
        return (
            <div>
                <nav className={`nav ${this.state.isMin ? 'header_nav-move' : ''}`}>
                    <div className="header-left">
                        <ul className="header_show">
                            <li><Link to="/display/perfume">Perfume</Link>
                                <ul className="header_has-children">
                                    <li><Link to="/display/perfume"><h3>Shop All Perfume</h3></Link></li>
                                    <li><h3>Shop Scent Family</h3></li>
                                    <li><Link to="">Scent 1</Link></li>
                                    <li><Link to="">Scent 2</Link></li>
                                    <li><Link to="">Scent 3</Link></li>
                                    <li><Link to="">Scent 4</Link></li>
                                    <li><Link to="">Scent 5</Link></li>
                                    <li><Link to=""><h3>Sale</h3></Link></li>
                                </ul>
                            </li>
                        </ul>

                        <ul className="header_show">
                            <li><Link to="/display/cologne">Cologne</Link>
                                <ul className="header_has-children">
                                    <li><Link to="/display/cologne"><h3>Shop All Cologne</h3></Link></li>
                                    <li><h3>Shop Scent Family</h3></li>
                                    <li><Link to="">Scent 1</Link></li>
                                    <li><Link to="">Scent 2</Link></li>
                                    <li><Link to="">Scent 3</Link></li>
                                    <li><Link to="">Scent 4</Link></li>
                                    <li><Link to="">Scent 5</Link></li>
                                    <li><Link to=""><h3>Sale</h3></Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <Link to="/home" ><img src="https://files.slack.com/files-pri/T039C2PUY-F97R1SPDW/scentriclogo.png" alt="logo" className="header_logo" /></Link>
                    <div className="header-right">
                        <Link to="">About</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/cart">Cart</Link>
                    </div>
                </nav>
            </div>
        );
    }
}