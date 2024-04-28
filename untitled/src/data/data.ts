export interface HotelData {
    id: number,
    name: string,
    shortDescription: string,
    longDescription: string,
    location: string,
    rate: number,
    pricePerRoom: number,
    imgPath: string
}

export const hotels: Array<HotelData> = [
    {
        id: 1,
        name: 'Harmony Hideaway Hotel',
        shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis. Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec.',
        longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec leo ligula. Etiam fermentum est in euismod egestas. Curabitur at condimentum ligula. Phasellus nunc velit, facilisis fermentum congue ac, cursus at leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam nec sapien vitae neque scelerisque tempus. Vestibulum hendrerit tellus ut pulvinar feugiat. Nullam iaculis vitae justo sit amet tempus. Nam nunc nunc, porttitor sed turpis quis, feugiat egestas leo. Phasellus consequat magna ante, ac aliquam felis convallis sit amet. Sed massa lorem, iaculis ac vestibulum ac, tempus a tortor. Ut posuere ipsum nec condimentum vehicula. Curabitur orci velit, aliquam vel arcu quis, semper congue ligula.',
        location: 'Florence',
        rate: 5,
        pricePerRoom: 100,
        imgPath: '/assets/explore-page/hotel-card-image-1.png'
    },

    {
        id: 2,
        name: 'Serene Retreat',
        shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis. Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec.',
        longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec leo ligula. Etiam fermentum est in euismod egestas. Curabitur at condimentum ligula. Phasellus nunc velit, facilisis fermentum congue ac, cursus at leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam nec sapien vitae neque scelerisque tempus. Vestibulum hendrerit tellus ut pulvinar feugiat. Nullam iaculis vitae justo sit amet tempus. Nam nunc nunc, porttitor sed turpis quis, feugiat egestas leo. Phasellus consequat magna ante, ac aliquam felis convallis sit amet. Sed massa lorem, iaculis ac vestibulum ac, tempus a tortor. Ut posuere ipsum nec condimentum vehicula. Curabitur orci velit, aliquam vel arcu quis, semper congue ligula.',
        location: 'Madrid',
        rate: 4,
        pricePerRoom: 70,
        imgPath: '/assets/explore-page/hotel-card-image-2.png'
    },

    {
        id: 3,
        name: 'Palm Springs',
        shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis. Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec.',
        longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec leo ligula. Etiam fermentum est in euismod egestas. Curabitur at condimentum ligula. Phasellus nunc velit, facilisis fermentum congue ac, cursus at leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam nec sapien vitae neque scelerisque tempus. Vestibulum hendrerit tellus ut pulvinar feugiat. Nullam iaculis vitae justo sit amet tempus. Nam nunc nunc, porttitor sed turpis quis, feugiat egestas leo. Phasellus consequat magna ante, ac aliquam felis convallis sit amet. Sed massa lorem, iaculis ac vestibulum ac, tempus a tortor. Ut posuere ipsum nec condimentum vehicula. Curabitur orci velit, aliquam vel arcu quis, semper congue ligula.',
        location: 'Sintra',
        rate: 4,
        pricePerRoom: 65,
        imgPath: '/assets/explore-page/hotel-card-image-3.png'
    },

    {
        id: 4,
        name: ' Oasis Resort',
        shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis. Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec.',
        longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec leo ligula. Etiam fermentum est in euismod egestas. Curabitur at condimentum ligula. Phasellus nunc velit, facilisis fermentum congue ac, cursus at leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam nec sapien vitae neque scelerisque tempus. Vestibulum hendrerit tellus ut pulvinar feugiat. Nullam iaculis vitae justo sit amet tempus. Nam nunc nunc, porttitor sed turpis quis, feugiat egestas leo. Phasellus consequat magna ante, ac aliquam felis convallis sit amet. Sed massa lorem, iaculis ac vestibulum ac, tempus a tortor. Ut posuere ipsum nec condimentum vehicula. Curabitur orci velit, aliquam vel arcu quis, semper congue ligula.',
        location: 'Sienna',
        rate: 5,
        pricePerRoom: 115,
        imgPath: '/assets/explore-page/hotel-card-image-4.png'
    },
]

export const findHotelById = (id: number): HotelData | undefined => {
    return hotels.find((hotel) => hotel.id === id);
}
