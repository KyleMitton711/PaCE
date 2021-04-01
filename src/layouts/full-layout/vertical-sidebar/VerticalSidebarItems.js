export default [
  { header: "Personal" },
  {
    group: "/theme",
    model: false,
    icon: "mdi-gauge",
    title: "Dashboards",
    children: [
      {
        icon: "mdi mdi-adjust",
        title: "Analytical",
        to: "dashboards/analytical",
      },
      {
        icon: "mdi mdi-adjust",
        title: "Classic",
        to: "dashboards/classic",
      },
      {
        icon: "mdi mdi-adjust",
        title: "Demographical",
        to: "dashboards/demographical",
      },
      {
        icon: "mdi mdi-adjust",
        title: "Minimal",
        to: "dashboards/minimal",
      },
      {
        icon: "mdi mdi-adjust",
        title: "Overview",
        to: "dashboards/overview",
      },
      {
        icon: "mdi mdi-adjust",
        title: "Ecommerce",
        to: "dashboards/ecommerce",
      },
    ],
  },
  {
    header: "Apps",
  },
  {
    title: "Chat",
    icon: "mdi-comment-outline",
    to: "/theme/apps/chat",
  },
  {
    icon: "mdi-calendar",
    title: "Calendar",
    to: "/theme/apps/fullcalendar",
  },
  {
    title: "Ecommerce-Shop",
    icon: "mdi-shopping",
    to: "/theme/apps/shop",
  },
  {
    title: "Contact",
    icon: "mdi-phone-classic",
    to: "/theme/apps/contact",
  },
  {
    title: "Contact List",
    icon: "mdi-phone",
    to: "/theme/apps/contact-list",
  },
  {
    title: "Contact Grid",
    icon: "mdi-phone-voip",
    to: "/theme/apps/contact-grid",
  },
  {
    title: "Email",
    icon: "mdi-email",
    to: "/theme/apps/email/inbox",
  },
  {
    title: "Todo",
    icon: "mdi-playlist-plus",
    to: "/theme/apps/todo",
  },
  { header: "Components" },
  {
    group: "/theme/components",
    model: false,
    icon: "mdi-animation",
    title: "Ui Components",
    children: [
      {
        title: "Alerts",
        icon: "mdi-alert",
        to: "/alerts",
      },
      {
        title: "Avatar",
        icon: "mdi-account-circle",
        to: "/avatar",
      },
      {
        title: "Badge",
        icon: "mdi-relative-scale",
        to: "/badge",
      },
      {
        title: "Banner",
        icon: "mdi-box-shadow",
        to: "/banner",
      },
      {
        title: "Appbar",
        icon: "mdi-arrange-bring-to-front",
        to: "/appbar",
      },
      {
        title: "Toolbar",
        icon: "mdi-table-column-plus-after",
        to: "/toolbar",
      },
      {
        title: "Systembar",
        icon: "mdi-format-float-left",
        to: "/systembar",
      },
      {
        title: "Bottom Navigation",
        icon: "mdi-border-bottom",
        to: "/bottomnavigation",
      },
      {
        title: "Bottomsheet",
        icon: "mdi-format-wrap-top-bottom",
        to: "/bottomsheet",
      },
      {
        title: "Breadcrumb",
        icon: "mdi-equal",
        to: "/breadcrumb",
      },
      {
        title: "Buttons",
        icon: "mdi-toggle-switch",
        to: "/buttons",
      },
      {
        title: "Fab",
        icon: "mdi-react",
        to: "/fab",
      },
      {
        title: "Cards",
        icon: "mdi-cards-outline",
        to: "/cards",
      },
      {
        title: "Carousel",
        icon: "mdi-view-carousel",
        to: "/carousel",
      },
      {
        title: "Chips",
        icon: "mdi-checkbox-multiple-blank-outline",
        to: "/chips",
      },
      {
        title: "Dialogs",
        icon: "mdi-tablet",
        to: "/dialogs",
      },
      {
        title: "Dividers",
        icon: "mdi-bandcamp",
        to: "/dividers",
      },
      {
        title: "Expansion Panel",
        icon: "mdi-credit-card-multiple",
        to: "/expansionpanel",
      },
      {
        title: "Footer",
        icon: "mdi-view-agenda",
        to: "/footer",
      },
      {
        title: "Overflow Buttons",
        icon: "mdi-window-open",
        to: "/overflow-buttons",
      },
      {
        title: "Grids",
        icon: "mdi-grid",
        to: "/grids",
      },
      {
        title: "Button Group",
        icon: "mdi-hexagon-multiple",
        to: "/themebutton-group",
      },
      {
        title: "Chip Group",
        icon: "mdi-image-filter-vintage",
        to: "/themechip-group",
      },
      {
        title: "Item Group",
        icon: "mdi-layers",
        to: "/themeitem-group",
      },
      {
        title: "List Item Group",
        icon: "mdi-playlist-plus",
        to: "/themelistitem-group",
      },
      {
        title: "Slide Group",
        icon: "mdi-recycle",
        to: "/themeslide-group",
      },
      {
        title: "Windows",
        icon: "mdi-window-maximize",
        to: "/themewindows",
      },
      {
        title: "Hover",
        icon: "mdi-white-balance-sunny",
        to: "/themehover",
      },
      {
        title: "Icons",
        icon: "mdi-unity",
        to: "/themeicons",
      },
      {
        title: "Images",
        icon: "mdi-image-area",
        to: "/themeimages",
      },

      {
        title: "Menus",
        icon: "mdi-launch",
        to: "/thememenus",
      },
      {
        title: "Navigation Drawers",
        icon: "mdi-image-broken-variant",
        to: "/themenavigation-drawers",
      },
      {
        title: "Overlay",
        icon: "mdi-arrange-bring-forward",
        to: "/themeoverlay",
      },
      {
        title: "Pagination",
        icon: "mdi-book-open-variant",
        to: "/themepagination",
      },
      {
        title: "Parallex",
        icon: "mdi-book-plus",
        to: "/themeparallex",
      },
      {
        title: "Color Pickers",
        icon: "mdi-grease-pencil",
        to: "/themecolor-pickers",
      },
      {
        title: "Date Pickers",
        icon: "mdi-calendar-multiple",
        to: "/themedate-pickers",
      },
      {
        title: "Time Pickers",
        icon: "mdi-clock-fast",
        to: "/themetime-pickers",
      },
      {
        title: "Progress Circular",
        icon: "mdi-compass",
        to: "/themeprogress-circular",
      },
      {
        title: "Progress Linear",
        icon: "mdi-crosshairs",
        to: "/themeprogress-linear",
      },
      {
        title: "Rating",
        icon: "mdi-star-circle",
        to: "/themerating",
      },
      {
        title: "Sheet",
        icon: "mdi-table-large",
        to: "/themesheet",
      },
      {
        title: "SkeletonLoaders",
        icon: "mdi-television-guide",
        to: "/themeskeleton-loaders",
      },
      {
        title: "Snackbar",
        icon: "mdi-trello",
        to: "/themesnackbar",
      },
      {
        title: "Sparkline",
        icon: "mdi-chart-areaspline",
        to: "/themesparkline",
      },
      {
        title: "Steppers",
        icon: "mdi-chart-gantt",
        to: "/themesteppers",
      },
      {
        title: "Subheaders",
        icon: "mdi-clipboard-outline",
        to: "/themesubheaders",
      },
      {
        title: "Tabs",
        icon: "mdi-sort-variant",
        to: "/themetabs",
      },
      {
        title: "Timeline",
        icon: "mdi-clock-end",
        to: "/themetimeline",
      },
      {
        title: "Tooltips",
        icon: "mdi-image-filter-vintage",
        to: "/themetooltips",
      },
      {
        title: "Treeview",
        icon: "mdi-webhook",
        to: "/themetreeview",
      },
    ],
  },
  {
    group: "/style-animation",
    model: false,
    icon: "mdi-palette",
    title: "Style & Animation",
    children: [
      {
        title: "Colors",
        icon: "mdi-format-color-fill",
        to: "/themecolors",
      },
      {
        title: "Content",
        icon: "mdi-blur-linear",
        to: "/themecontent",
      },
      {
        title: "Display",
        icon: "mdi-application",
        to: "/themedisplay",
      },
      {
        title: "Elevation",
        icon: "mdi-assistant",
        to: "/themeelevation",
      },
      {
        title: "Flex",
        icon: "mdi-box-cutter",
        to: "/themeflex",
      },
      {
        title: "Float",
        icon: "mdi-alpha",
        to: "/themefloat",
      },
      {
        title: "Spacing",
        icon: "mdi-bridge",
        to: "/themespacing",
      },
      {
        title: "Text",
        icon: "mdi-bowling",
        to: "/themetext",
      },
      {
        title: "Typography",
        icon: "mdi-sort",
        to: "/themetypography",
      },
      {
        title: "Transitions",
        icon: "mdi-text-shadow",
        to: "/themetransitions",
      },
    ],
  },
  { header: "Charts" },
  {
    group: "/charts",
    model: false,
    icon: "mdi-chart-bar",
    title: "Charts",
    children: [
      {
        title: "ApexCharts",
        icon: "mdi-chart-arc",
        to: "/themeapexcharts",
      },
    ],
  },
  { header: "Forms" },
  {
    group: "/form-elements",
    model: false,
    icon: "mdi-collage",
    title: "Form Elements",
    children: [
      {
        title: "Autocompletes",
        icon: "mdi-adjust",
        to: "/themefeautocompletes",
      },
      {
        title: "Combobox",
        icon: "mdi-adjust",
        to: "/themefecombobox",
      },
      {
        title: "File Inputs",
        icon: "mdi-adjust",
        to: "/themefefileinputs",
      },
      {
        title: "Inputs",
        icon: "mdi-adjust",
        to: "/themefeinputs",
      },
      {
        title: "Overflow Buttons",
        icon: "mdi-adjust",
        to: "/themefeoverflowbuttons",
      },
      {
        title: "Selection Controls",
        icon: "mdi-adjust",
        to: "/themefeselectioncontrols",
      },
      {
        title: "Selects",
        icon: "mdi-adjust",
        to: "/themefeselects",
      },
      {
        title: "Sliders",
        icon: "mdi-adjust",
        to: "/themefesliders",
      },
      {
        title: "Textareas",
        icon: "mdi-adjust",
        to: "/themefetextareas",
      },
      {
        title: "Textfields",
        icon: "mdi-adjust",
        to: "/themefetextfields",
      },
    ],
  },
  {
    group: "/form-layouts",
    model: false,
    icon: "mdi-checkbox-multiple-blank-outline",
    title: "Form Layouts",
    children: [
      {
        title: "Form Action",
        icon: "mdi-adjust",
        to: "/themeflformaction",
      },
      {
        title: "Form Basic",
        icon: "mdi-adjust",
        to: "/themeflformbasic",
      },
      {
        title: "Form Wizard",
        icon: "mdi-adjust",
        to: "/themeformwizard",
      },
      {
        title: "Form Horizontal",
        icon: "mdi-adjust",
        to: "/themeflformhorizontal",
      },
      {
        title: "Form Validation",
        icon: "mdi-adjust",
        to: "/themeformvalidation",
      },
    ],
  },
  { header: "Widgets" },
  {
    title: "Drag n Drop",
    icon: "mdi-package-variant-closed",
    to: "/theme/extra-components/dragndrop",
  },
  {
    title: "Lists",
    icon: "mdi-format-list-bulleted-type",
    to: "/theme/components/lists",
  },
  { header: "Tables" },
  {
    title: "Simple Table",
    icon: "mdi-table",
    to: "/theme/tables/tablesimple",
  },
  {
    title: "Datatable",
    icon: "mdi-table-column-width",
    to: "/theme/tables/tabledatatable",
  },
  {
    title: "Data Iterators",
    icon: "mdi-table-edit",
    to: "/theme/tables/tabledataiterators",
  },
  { header: "Extra" },
  {
    group: "/authentication",
    model: false,
    icon: "mdi-lock",
    title: "Authentication",
    children: [
      {
        title: "Boxed Login",
        icon: "mdi-chart-arc",
        to: "/themeboxedlogin",
      },
      {
        title: "Login",
        icon: "mdi-chart-arc",
        to: "/themefulllogin",
      },
      {
        title: "Boxed Register",
        icon: "mdi-chart-arc",
        to: "/themeboxedregister",
      },
      {
        title: "Register",
        icon: "mdi-chart-arc",
        to: "/themefullregister",
      },
      {
        title: "Error",
        icon: "mdi-chart-arc",
        to: "/themeerror",
      },
    ],
  },
  {
    group: "/icons",
    model: false,
    icon: "mdi-face",
    title: "Icons",
    children: [
      {
        title: "Material",
        icon: "mdi-chart-arc",
        to: "/themematerialicons",
      },
      {
        title: "Font Awesome",
        icon: "mdi-chart-arc",
        to: "/themefontawesomeicons",
      },
      {
        title: "Themify",
        icon: "mdi-chart-arc",
        to: "/themethemifyicons",
      },
      {
        title: "Simple line",
        icon: "mdi-chart-arc",
        to: "/themesimplelineicons",
      },
    ],
  },
];
