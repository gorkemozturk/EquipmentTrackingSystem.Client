export class Sort {
    private direction: number = 1;
    private collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: 'base'
    });

    constructor() {}

    public execute(property: any, order: string, type: string = '') {
        if (order === 'desc') {
            this.direction = -1;
        }

        return (a, b) => {
            if (type === 'date') {
                return this.sort(new Date(a[property]), new Date(b[property]));
            }
            else {
                return this.collator.compare(a[property], b[property]) * this.direction;
            }
        }
    }

    private sort(a: any, b: any) {
        if (a < b) {
            return -1 * this.direction;
        }
        else if (a > b) {
            return 1 * this.direction;
        }
        else {
            return 0 * this.direction;
        }
    }
}