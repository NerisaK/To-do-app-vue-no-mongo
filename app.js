const app = new Vue({
  el: "#app",
  data: {
    taskName: "",
    taskType: "",
    day: "",
    fromTime: "",
    toTime: "",
    tasks:[
      {
        text: "First Task (delete me if you want)",
        type: "Other",
        date: "2021-03-16",
        fromT: "12:20",
        toT: "15:10",
      },
    ],
    currentSort:'date',
    currentSortDirection:'asc',
    pageSize: 5,
    currentPage: 1,
  },
  methods: {
    addTask() {
      this.tasks.push({
        text: this.taskName,
        type: this.taskType,
        date: this.day,
        fromT: this.fromTime,
        toT: this.toTime,
      });
      this.clearForm();
    },
    removeTask(task){
      const taskIndex = this.tasks.indexOf(task);
      this.tasks.splice(taskIndex, 1);
    },
    clearForm(){
      this.taskName = "";
      this.taskType = "";
      this.day = "";
      this.fromTime = "";
      this.toTime = "";
    },
    sortTable(sortType) {
      if(sortType === this.currentSort) {
        this.currentSortDirection = this.currentSortDirection==='asc'?'desc':'asc';
      }
      this.currentSort = sortType;
    },
    nextPage: function() {
      if((this.currentPage*this.pageSize) < this.tasks.length){
        this.currentPage++;
      };        
    },
    prevPage: function() {
      if(this.currentPage > 1){
        this.currentPage--;
      };        
    },
  },
  computed: {
    sortedTasks: function() {
      return this.tasks.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDirection === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index) => {
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end) return true;
      });
    },
    lastPage: function() {
      if (this.tasks.length % this.pageSize !== 0){
        return Math.ceil(this.tasks.length / this.pageSize);
      }
      else {
        return this.tasks.length / this.pageSize
      };
    },
  },
});

