const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
        authenticated:false
              
      };
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
        authenticated:false
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
        authenticated:true
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
        authenticated:false
      };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };

      case "FOLLOWTOPIC":
        return {
          ...state,
          user: {
            ...state.user,
            topicsFollowed: [...state.user.topicsFollowed, action.payload],
          },
        };


    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };


      case "UNFOLLOWTOPIC":
        return {
          ...state,
          user: {
            ...state.user,
            topicsFollowed: state.user.topicsFollowed.filter(
              (topic) => topic !== action.payload
            ),
          },
        };


    default:
      return state;
  }
};

export default AuthReducer;
