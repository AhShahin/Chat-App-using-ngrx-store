


function uiStoreData(state: StoreData, action): StoreData{
  switch (action.type){
    case USER_THREADS_LOADED_ACTION:
      return handleLoadUserThreadsAction(state, action);

    default:
      return state;
  }
}

function handleLoadUserThreadsAction(state: StoreData,
                                     action: UserThreadsLoadedAction): StoreData {
  return  {
    participants: _.keyBy(action.payload.participants, 'id'),
    messages: _.keyBy(action.payload.messages, 'id'),
    threads: _.keyBy(action.payload.threads, 'id')
  };
}
