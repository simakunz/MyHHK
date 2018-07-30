export class Categories {
     categories: string[];
    
    constructor(){
        this.categories = ['Mtl. Fixausgaben', 'jhrl. Ausgaben',
                    'Kantine', 'Sonderposten', 'Spritgeld',
                    'Hobbies', 'Kredite', 'Zum regulären Ausgeben'];
    }

    public get():string[]{
        return this.categories;
    }
}