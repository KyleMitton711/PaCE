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
      title: "Content",
      icon: "mdi-undefined",
      group: "/admin/tags",
      subGroup: true,
      children: [
        {
          title: "Padegogy",
          icon: "mdi-undefined",
          to: "21",
        }, {
          title: "Topic",
          icon: "mdi-undefined",
          to: "22",
        }, {
          title: "Symptom",
          icon: "mdi-undefined",
          to: "23",
        }, {
          title: "Illness",
          icon: "mdi-undefined",
          to: "24",
        }, {
          title: "Context",
          icon: "mdi-undefined",
          to: "25",
        }, {
          title: "Role",
          icon: "mdi-undefined",
          to: "26",
        }
      ]
    }]
  }
];
