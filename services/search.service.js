const { Sequelize } = require("sequelize");
const db = require("../models");
const { all } = require("axios");
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
let Xitems;
const searchByCategory = async (q) => {
    let Citems;
    if (!Xitems) {
        Xitems = await getAllItems();
        Xitems = Xitems.slice(0, 1000);
        Xitems = Xitems.map((item) => item.dataValues);
        Xitems.forEach((item) => {
        item.Categories_Items = item.Categories_Items.map((ci) => ci.Category.dataValues);
    });
    }
    else 
    Citems = Xitems;
    
    
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
const getAllDestination = async () => {
    try {
        const destinations = await destination.findAll();
        return destinations;
    } catch (error) {
        throw new Error(`Error getting Desination: ${error.message}`);
    }

}
let allItems;

const filterSearch = async (q) => {
    //e = localtion
        //p = price 
        //s = star
        //t = searchText
        //localhost:8000/search/filterSearch?e=Quận Hải Châu, Quận Liên Chiểu, Huyện Hòa Vang&p=85000&s=4.5
    
    let {e,p,t,s} = q;
    if (!e) e = "";
    if (!p) p = 0;
    if (!s) s = 0;
    if (!t) t = " ";


    e = e.split(",");
    p = parseFloat(p);
    s = parseFloat(s);
    console.log(e,p,s)

    try {
        if (!allItems) {
            allItems = await getAllDestination();
            allItems = allItems.map((item) => item.dataValues);
        }
        let items = allItems;

        items = items.filter((item) => {
            let check = false;
            for (let i = 0; i < e.length; i++) {
                if (item.location.toLowerCase().includes(e[i].toLowerCase())) {
                    check = true;
                    break;
                }
            }
            let check2 = false;
            if (t) {
                check2 = item.name.toLowerCase().includes(t.toLowerCase());
            }



            return   check2 && check && item.averagePrice <= p && item.averageRating >= s;
        });
        return items;
    } catch (error) {
        throw new Error(`Error getting filterSearch: ${error.message}`);
    }
}


module.exports = {
    searchByName,searchByCategory,filterSearch}