import { GetRestaurantsAPI } from '../api/restaurants';

describe('GetRestaurants function', () => {
    it('should return list of restaurants', async () => {
        const restaurants = await GetRestaurantsAPI();
        expect(restaurants).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    _id: '672de88ff54107237ff75565',
                    address: {
                        _id: '672df7b0f54107237ff75577',
                        city: 'Esbjerg',
                        postalCode: '6700',
                        street: 'Elm Court 27',
                    },
                    menu: [
                        {
                            _id: '672de8c4f54107237ff75547',
                            availability: true,
                            name: 'Chicken nuggets',
                            price: 6.99,
                        },
                        {
                            _id: '672de8c4f54107237ff75548',
                            availability: true,
                            name: 'Whopper Stopper without rubber',
                            price: 39.99,
                        },
                    ],
                    name: 'The white chameleon',
                }),
            ])
        );
    });
});
