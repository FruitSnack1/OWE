
class CodesService {
    getCategories(req, res) {
        res.json([
            {
                id: 1,
                name: 'Nábytek'
            },
            {
                id: 2,
                name: 'Elektronika'
            },
            {
                id: 3,
                name: 'Auto-moto'
            },
            {
                id: 4,
                name: 'Oblečení'
            },
            {
                id: 5,
                name: 'Ostatní'
            }
        ])
    }
}

const codesService = new CodesService()
export default codesService