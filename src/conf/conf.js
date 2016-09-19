const imagesPath = 'images/';
const imagesScorePath = imagesPath + 'scores/';
const transportImagePath = imagesScorePath + 'transport/';
const housingImagePath = imagesScorePath + 'housing/';
const environmentImagePath = imagesScorePath + 'environment/';
const competenceImagePath = imagesScorePath + 'competence/';

export const candidateImagesPath = imagesPath + 'candidates/';
export const iconImagesPath = imagesPath + 'icons/';
export const wardImagesPath =  imagesPath + 'wardIcons/';

export const wards = ['Albany','Albert-Eden-Roskill','Franklin','Manukau','Manurewa-Papakura','Maungakiekie-Tamaki','North Shore','Orakei','Rodney','Howick','Waitakere','Waitemata and Gulf','Whau'];
export const localBoards = ['Albert-Eden','Devonport-Takapuna','Franklin','Great Barrier','Henderson-Massey','Hibiscus and Bays','Kaipatiki','Mangere-Otahuhu','Manurewa','Maungakiekie-Tamaki','Orakei','Otara-Papatoetoe','Papakura','Puketapapa','Rodney','Howick','Upper Harbour','Waiheke','Waitakere Ranges','Waitemata','Whau'];
export const categories = ['transport', 'housing', 'environment', 'competence'];
export const scoreBreakdowns = {
    transport: {
        questions:[
            {
                total: 6,
                title: 'Transport Funding Levels',
                image: transportImagePath + 'spend.png'
            },
            {
                total: 6,
                title: 'Top 3 Transport Priorities',
                image: transportImagePath + 'prio.png'
            },
            {
                total: 4,
                title: 'Projects Doesn\'t Support',
                image: transportImagePath + 'not.png'
            },
            {
                total: 5,
                title: 'Harbour CrossingRail to Shore',
                image: transportImagePath + 'awhc.png'
            },
            {
                total: 5,
                title: 'Rail to the Airport',
                image: transportImagePath + 'airport.png'
            },
            {
                total: 5,
                title: 'Dominion Road Light Rail',
                image: transportImagePath + 'lr.png'
            },
            {
                total: 12,
                title: 'Cycling Funding & Space',
                image: transportImagePath + 'cycling.png'
            },
            {
                total: 7,
                title: 'Non-Road Building Focus',
                image: transportImagePath + 'roads.png'
            },
            ],
        total: 50
    },
    housing: {
        questions: [
            {
                total: 6,
                title: 'Sprawl vs Density, Up or Out',
                image: housingImagePath + 'Compact-City.png'
            },
            {
                total: 8,
                title: 'Unitary Plan Passing',
                image: housingImagePath + 'Unitary-Plan.png'
            },
            {
                total: 6,
                title: 'Housing Ideas',
                image: housingImagePath + 'HousingIdeas.png'
            }
            ],
        total: 20
    },
    environment: {
        questions: [
            {
                total: 5,
                title: 'Climate Change',
                image: environmentImagePath + 'ClimateChange.png'
            },
            {
                total: 5,
                title:'Ideas Low-Carbon City',
                image: environmentImagePath + 'GreatIdea.png'
            },
            {
                total: 5,
                title:'City for People or Cars',
                image: environmentImagePath + 'PeopleVSCars.png'
            }
            ],
        total : 15
    },
    competence: {
        questions: [
            {
                total: 15,
                title: 'How capable is this person?',
                image: competenceImagePath + 'Competence.png'
            }
            ],
        total: 15
    }
};