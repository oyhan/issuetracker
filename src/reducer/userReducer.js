import * as actions from "actions/userActions";
import { UserService } from "services/UserService";


export const userReducer = (state, action) => {
    console.log('state: ', state);


    var user = "";
    switch (action.type) {
        case actions.LOGIN:
             user = action.user;
            UserService.singin(user);
            return {user ,...state};


        case actions.LOGOFF:

            user = UserService.Logout();
            return {user ,...state};

        case actions.ISAUTHENTICATED:

             user = UserService.Get();
            user.isAuthenticated = action.isAuthenticated;
            return {user ,...state};
        default:
            return state;
            break;
    }

}