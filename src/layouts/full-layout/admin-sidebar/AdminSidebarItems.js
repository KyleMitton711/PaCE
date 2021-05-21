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
        to: "11",
      }, {
        title: "Type",
        to: "12",
      }, {
        title: "Mode",
        to: "13",
      }, {
        title: "ContentPadegogy",
        to: "21",
      }, {
        title: "ContentTopic",
        to: "22",
      }, {
        title: "ContentSymptom",
        to: "23",
      }, {
        title: "ContentIllness",
        to: "24",
      }, {
        title: "ContentContext",
        to: "25",
      }, {
        title: "ContentRole",
        to: "26",
      }]
    },
  ];
  