``` css
  
    @media (min-width: 1536px) { ... }
    @media (min-width: 1440px) { ... }
    @media (min-width: 1366px) { ... }
    @media (min-width: 1280px) { ... }
    @media (min-width: 1024px) { ... }
    @media (min-width: 768px) { ... }

    /* (orientation: landscape) */
    /* (orientation: portrait) */
    /* ❌ ✔️ */


    /* Desktop  Screen */

    /*  
        1920×1080    20.87%
        1600×900 	4.1%
        1536×864 	8.52%
        1440×900 	6.97%
        1366×768	    22.6%
        1280×1024    2.65%
        1280×800	    2.95%
        1280×720 	4.81%
        1024×768 	2.59%
        768×1024     2.47%
    */

    @media (max-width: 1920px) and (min-height: 720px) {}
    @media (max-width: 1600px) and (min-height: 720px) {}
    @media (max-width: 1536px) and (min-height: 720px) {}
    @media (max-width: 1440px) and (min-height: 720px) {}
    @media (max-width: 1366px) and (min-height: 720px) {}
    @media (max-width: 1280px) and (min-height: 720px) {}
    @media (max-width: 1080px) and (min-height: 720px) {}
    @media (max-width: 1024px) and (min-height: 720px) {}
    @media (max-width: 900px) and (min-height: 720px) {}
    @media (max-width: 864px) and (min-height: 720px) {}
    @media (max-width: 800px) and (min-height: 720px) {}
    @media (max-width: 768px) and (min-height: 720px) {}
    @media (max-width: 720px) and (min-height: 720px) {}


    /* Mobile Screen */

    /*  
        414×896      7.82%
        375×812      5.15%
        375×667      6.65%
        360×780      6.02%
        360×760      5.27% 
        360×640      12.98%
    */
    @media (max-width: 896px) and ( min-height: 360px) {}
    @media (max-width: 812px) and ( min-height: 360px) {}
    @media (max-width: 780px) and ( min-height: 360px) {}
    @media (max-width: 760px) and ( min-height: 360px) {} 
    @media (max-width: 667px) and ( min-height: 360px) {}
    @media (max-width: 640px) and ( min-height: 360px) {}
    @media (max-width: 414px)  and ( min-height: 360px) {}
    @media (max-width: 375px)  and ( min-height: 360px) {}
    @media (max-width: 360px)  and ( min-height: 360px) {}


    /* Tablet Screen Stats */
    
    /* 
        768×1024    4-6.11%
        1280×800    7.38%
        800×1280    5.9%
        601×962     5.15%
        962×601     3.52%
        810×1080    2.83%
    */

    @media (max-width: 1280px max-height: 601px) {}
    @media (max-width: 1280px max-height: 601px) {}
    @media (max-width: 1080px max-height: 601px) {}
    @media (max-width: 1024px max-height: 601px) {}
    @media (max-width: 962px max-height: 601px) {}
    @media (max-width: 810px max-height: 601px) {}
    @media (max-width: 800px max-height: 601px) {}
    @media (max-width: 768px max-height: 601px) {}
    @media (max-width: 601px max-height: 601px) {}

```