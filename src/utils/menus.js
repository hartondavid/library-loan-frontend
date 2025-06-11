
import { RIGHTS_MAPPING } from './utilConstants';
import BookIcon from '@mui/icons-material/Book';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import HistoryIcon from '@mui/icons-material/History';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export const menus = [

    {
        id: 1,
        parentId: null,
        name: "Carti",
        to: "/dashboard/books",
        icon: BookIcon,
        isCategory: false,
        excludelocationsType: [],
        rights: [RIGHTS_MAPPING.LIBRARIAN, RIGHTS_MAPPING.STUDENT],
        order: 90,
        children: [

        ]
    },

    {
        id: 2,
        parentId: null,
        name: "Imprumuturi",
        to: "/dashboard/loans",
        icon: AccessTimeIcon,
        isCategory: false,
        excludelocationsType: [],
        rights: [RIGHTS_MAPPING.LIBRARIAN, RIGHTS_MAPPING.STUDENT],
        order: 90,
        children: [

        ]
    },
    {
        id: 3,
        parentId: null,
        name: "Istoric",
        to: "/dashboard/history",
        icon: HistoryIcon,
        isCategory: false,
        excludelocationsType: [],
        rights: [RIGHTS_MAPPING.LIBRARIAN, RIGHTS_MAPPING.STUDENT],
        order: 90,
        children: [

        ]
    },

]
