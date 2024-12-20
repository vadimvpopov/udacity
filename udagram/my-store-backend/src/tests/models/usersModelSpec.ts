import { UsersStore, User } from "../../models/users";

const usersStrore = new UsersStore();

describe('Test model for users', () => {
    it('calling all the methods with correct parameters [HAPPY PATH]', async () => {
        const users = await usersStrore.getUsers();
        expect(users.length).toEqual(2);

        const user = await usersStrore.getUser(1);
        //@ts-ignore
        expect(user.firstname).toEqual('John');
        //@ts-ignore
        expect(user.lastname).toEqual('Dow');

        const anotherUser = await usersStrore.loadUser({fullName: 'John Dow', password:'123'});
        //@ts-ignore
        expect(anotherUser.firstname).toEqual('John');
        //@ts-ignore
        expect(anotherUser.lastname).toEqual('Dow');
    });

    it('calling all the methods with incorrect parameters [unHAPPY PATH]', async () => {
        // non-existing user
        const user = await usersStrore.getUser(5);
        expect(user).toBeFalsy();

        // wrong password
        await expectAsync(usersStrore.loadUser({fullName: 'John Dow', password:'1234'})).toBeRejected();
        

        // wrong name
        const anotherUser = await usersStrore.loadUser({fullName: 'John Dow', password:'123'});
        expect(anotherUser).toBeFalsy();
    });
});