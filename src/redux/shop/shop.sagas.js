import { takeLatest, call, put, all } from 'redux-saga/effects'

import shopActionTypes from './shop.types'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

import { fetchCollectionsSuccess, fetchCollectionsFailure } from '../../redux/shop/shop.actions';

export function* fetchCollectionsStart(){
    yield takeLatest(
        shopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    )
}

export function* fetchCollectionsAsync(){
    try{
        yield console.log('iam fired')
        const collectionRef = firestore.collection('collections')
        const snapshot = yield collectionRef.get()
        const collectionsMap = yield call(
            convertCollectionsSnapshotToMap,
            snapshot
        )
        yield put(fetchCollectionsSuccess(collectionsMap))
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }
}

export function* shoptSagas(){
    yield all([
        call(fetchCollectionsStart)
    ])
}