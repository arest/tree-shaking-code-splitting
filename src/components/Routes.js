/*eslint-disable no-unused-vars */
import React from 'react'
import { Router, browserHistory, Route } from 'react-router/es6'
import App from './App'

// Webpack is configured to create ajax wrappers around each of these modules.
// Webpack will create a separate chunk for each of these imports (including
// any dependencies). The real module can be loaded by calling the function:
// Course(module => { /* module is loaded */ })
import Course from '../routes/Course/Course'
import AnnouncementsSidebar from '../routes/Course/routes/Announcements/Sidebar'
import Announcements from '../routes/Course/routes/Announcements/Announcements'
import Announcement from '../routes/Course/routes/Announcements/routes/Announcement'
import AssignmentsSidebar from '../routes/Course/routes/Assignments/Sidebar'
import Assignments from '../routes/Course/routes/Assignments/Assignments'
import Assignment from '../routes/Course/routes/Assignments/routes/Assignment'
import CourseGrades from '../routes/Course/routes/Grades'
import Calendar from '../routes/Calendar'
import Grades from '../routes/Grades'
import Messages from '../routes/Messages'

import { lazyLoadComponent, lazyLoadComponents } from '../utils/lazyload'

const Root = () => (
	<Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <Route path="calendar" getComponent={ lazyLoadComponent(Calendar) } />
      <Route path="course/:courseId" getComponent={ lazyLoadComponent(Course) }>
        <Route path="announcements" getComponents={ lazyLoadComponents({
          sidebar: AnnouncementsSidebar,
          main: Announcements
        }) }>
          <Route path=":announcementId" getComponent={ lazyLoadComponent(Announcement) } />
        </Route>
        <Route path="assignments" getComponents={ lazyLoadComponents({
          sidebar: AssignmentsSidebar,
          main: Assignments
        }) }>
          <Route path=":assignmentId" getComponent={ lazyLoadComponent(Assignment) } />
        </Route>
        <Route path="grades" getComponent={ lazyLoadComponent(CourseGrades) } />
      </Route>
      <Route path="grades" getComponent={ lazyLoadComponent(Grades) } />
      <Route path="messages" getComponent={ lazyLoadComponent(Messages) } />
      <Route path="profile" getComponent={ lazyLoadComponent(Calendar) } />
    </Route>
  </Router>
  )

export default Root