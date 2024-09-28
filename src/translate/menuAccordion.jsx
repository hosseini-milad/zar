const menutrans ={
    title:{
        english:"Barzegar",
        persian:"برزگر",
        icon:"fa-eercast",
        href:"https://sharifoilco.com"
        
    },
    menu:[
        {
            english: "OverView",
            persian: "OverView",
            index:0,
            icon:"fa-dashboard",
            href:"#",
            children:[
            
            {
                english: "Tasks",
                persian: "وظایف و پیگیری",
                index:1,
                icon:"fa-bar-chart",
                href:"/crm",
                url:"crm"
            },
            
            ]
        },
        {
            english: "Customers",
            persian: "مشتریان",
            index:1,
            icon:"fa-users",
            href:"#",
            children:[
                {
                    english: "Customers",
                    persian: "مدیریت مشتریان",
                    index:0,
                    icon:"fa-users",
                    href:"/customers",
                    url:"customers"
                },
                
                ]
        },
        {
            english: "Orders",
            persian: "سفارشات",
            index:2,
            icon:"fa-tasks",
            href:"#",
            children:[
                {
                    english: "Orders",
                    persian: "سفارشات",
                    index:0,
                    icon:"fa-tasks",
                    href:"/orders",
                    url:"orders"
                },
                
                ]
        },
        
        {
            english: "Products",
            persian: "محصولات و خدمات",
            index:3,
            icon:"fa-bar-chart",
            href:"#",
            children:[
                {
                    english: "Products",
                    persian: "محصولات",
                    index:0,
                    icon:"fa-dashboard",
                    href:"/products",
                    url:"products"
                },
                
                ]
        },
        
    ],
    setting:[
        {
            english: "Access",
            persian: "دسترسی ها",
            index:0,
            icon:"fa-key",
            href:"/access",
            url:"access"
        },
        {
            english: "Filters",
            persian: "فیلترها",
            index:1,
            icon:"fa-key",
            href:"/filter",
            url:"filter"
        },
        {       
            english: "User Management",
            persian: "مدیریت کاربران",
            index:0,
            icon:"fa-user",
            href:"/users",
            url:"users"
        }
    ]
    }
    export default menutrans