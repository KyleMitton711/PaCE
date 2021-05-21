export default [
    {
      title: "User Metrics",
      icon: "mdi-view-dashboard-outline",
      to: "/admin/usermetrics",
    },
    {
      icon: "mdi-map-marker",
      title: "Projects",
      to: "/admin/projects",
    },
    {
      title: "Resources",
      icon: "mdi-dots-grid",
      to: "/admin/resources",
    },
    {
      title: "Programs",
      icon: "mdi-select-group",
      to: "/admin/programs",
    },
    {
      group: "/admin/tags",
      title: "Master Tag lists",
      icon: "mdi-tag",
      children: [{
        title: "Audience",
        icon: "mdi-undefined",
        to: "11",
      }, {
        title: "Type",
        icon: "mdi-undefined",
        to: "12",
      }, {
        title: "Mode",
        icon: "mdi-undefined",
        to: "13",
      }, {
        title: "ContentPadegogy",
        icon: "mdi-undefined",
        to: "21",
      }, {
        title: "ContentTopic",
        icon: "mdi-undefined",
        to: "22",
      }, {
        title: "ContentSymptom",
        icon: "mdi-undefined",
        to: "23",
      }, {
        title: "ContentIllness",
        icon: "mdi-undefined",
        to: "24",
      }, {
        title: "ContentContext",
        icon: "mdi-undefined",
        to: "25",
      }, {
        title: "ContentRole",
        icon: "mdi-undefined",
        to: "26",
      }]
    },
  ];
  