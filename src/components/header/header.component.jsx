import React from 'react'
import  { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { ReactComponent as Logo } from '../../assets/crown.svg'

import { auth } from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'

import './header.styles.scss'

const Header = ({currentUser, hidden}) => {
    return (
        <div className="header">
            <Link to="/">
                <Logo className="logo"/>
            </Link>
            <div className="options">
                <Link className="option" to="/shop">
                    SHOP
                </Link>
                <Link className="option" to="/shop">
                    CONTACT
                </Link>
                {
                    currentUser ?
                    (<div className="option" onClick= {() => auth.signOut()}>SIGN OUT</div>)
                    :
                    (<Link className="option" to='/signin'>SIGN IN</Link>)
                }
                <CartIcon/>
            </div>
            {
                hidden ? null : <CartDropdown />
            }

        </div>
    )
}

const mapStateToProps = createStructuredSelector({    
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
}) 
    
// createStructuredSelector évite la redondance de l'écriture du state, les deux mapStateToProps font la même choses ici
// const mapStateToProps = ( state ) => ({
//     currentUser: selectCurrentUser(state),
//     hidden: selectCardHidden(state)
//   });
  
  export default connect(mapStateToProps)(Header);
