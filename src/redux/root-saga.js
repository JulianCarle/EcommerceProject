import { all, call } from 'redux-saga/effects'

import { shoptSagas } from './shop/shop.sagas'
import { userSagas } from './user/user.sagas'
import { cartSagas } from './cart/cart.sagas'

export default function* rootSaga() {
    yield all([
        call(shoptSagas), 
        call(userSagas),
        call(cartSagas),
    ])
}

