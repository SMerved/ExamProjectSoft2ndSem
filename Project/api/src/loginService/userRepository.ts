import { UserCredentials } from '../interfaces/users.ts';
import { AppDataSource } from '../ormconfig.ts';
import { User, Address } from './User.ts';

const userRepository = AppDataSource.getMongoRepository(User);
const addressRepository = AppDataSource.getMongoRepository(Address);

async function validateCredentials(credentials: UserCredentials /*source*/) {
    const { username /*tainted*/, password /*tainted*/ } = credentials;

    //userRepository.findOne is a sink
    //user is tainted
    const user = await userRepository.findOne({
        where: {
            username: username,
            password: password,
        },
    });
    if (!user) {
        //Static return
        return null;
    }
    //addressRepository.findOne is a sink
    //address is tainted
    const address = await addressRepository.findOne({
        where: { _id: user.address },
    });
    if (!address) {
        console.error('User does not have an address');
    } else {
        user.address = address;
    }
    //sink
    return user;
}

export { validateCredentials };
