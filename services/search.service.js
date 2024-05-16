const { Sequelize } = require("sequelize");
const db = require("../models");
const Des_Items = db.Des_Items;
const destination = db.Destination;
const Categories_Item = db.Categories_Item;
const Category = db.Categories;

const getAllItems = async () => {
    try {
        const menu = await Des_Items.findAll({
            include:[
                {
                    model: destination,
                    attributes: ["name","location"],
                },
                {
                    model: Categories_Item,
                    include: [
                        {
                            model: Category,
                            attributes: ["id","name"],
                        },
                    ],
                },
            ],

        });
        console.log("finsihed fill all items")
        return menu;
    } catch (error) {
        throw new Error(`Error getting menu: ${error.message}`);
    }
};



const getItems = async (itemName) => {
    try {
        const menu = await Des_Items.findAll({
            where: {
                name: {
                    [Sequelize.Op.like]: Sequelize.literal(`LOWER('%${itemName}%')`),
                },
            },
            include:[
                {
                    model: destination,
                    attributes: ["name","location"],
                },
                {
                    model: Categories_Item,
                    include: [
                        {
                            model: Category,
                            attributes: ["id","name"],
                        },
                    ],
                },
            ],
            limit: 10,

        });
        return menu;
    } catch (error) {
        throw new Error(`Error getting menu: ${error.message}`);
    }
};
const merge = (left, right) => {
    let result = [];
    let il = 0;
    let ir = 0;
    while (il < left.length && ir < right.length) {
        if (left[il].criteria > right[ir].criteria) {
            result.push(left[il++]);
        } else {
            result.push(right[ir++]);
        }
    }
    return result.concat(left.slice(il)).concat(right.slice(ir));

}

const mergeSort = (items) => {
    items = Array.from(items);
    if (items.length <= 1) return items;
    const middle = Math.floor(items.length / 2);
    const left = items.slice(0, middle);
    const right = items.slice(middle);
    return merge(
        mergeSort(left), mergeSort(right)
    );
}
let Citems;
const searchByCategory = async (q) => {
    if (!Citems) {
        Citems = await getAllItems();
        Citems = Citems.slice(0, 1000);
        Citems = Citems.map((item) => item.dataValues);
        Citems.forEach((item) => {
        item.Categories_Items = item.Categories_Items.map((ci) => ci.Category.dataValues);
    });
    }

    
    // console.log(Citems[0].Categories_Items[0].name);

    if (!q) q = "";
    let categories = q.split(",");
    categories = categories.slice(0, 10);
    categories = categories.map((c) => c.trim().toLowerCase());

    for (let i = 0; i < Citems.length; i++) {
        Citems[i].criteria = 0;
        for (let j = 0; j < Citems[i].Categories_Items.length; j++) {
            if (categories.includes(Citems[i].Categories_Items[j].name)) {
                Citems[i].criteria++;
            }
        }
    }
    Citems = mergeSort(Citems);

   

    return  Citems;


}


const searchByName = async (itemName)  => {
    if (!itemName)  itemName = "";
    try {
        let items = await getItems(itemName);       
        return items;
        
    
    } catch (error) {
        throw new Error(`Error getting menu: ${error.message}`);
    }

}
module.exports = {
    searchByName,searchByCategory}