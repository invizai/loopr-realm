import React, {useContext, useState, useEffect, useRef} from 'react';
import Realm from 'realm';
import {useAuth} from './AuthProvider';
import {Project, Product} from '../models/schemas';

const ProjectsContext = React.createContext(null);

const ProjectsProvider = ({children}) => {
  const {user} = useAuth();

  const [projects, setProjects] = useState([]);

  const realmRef = useRef(null);

  useEffect(() => {
    if (user == null) {
      console.warn('ProjectsView must be authenticated!');
      return;
    }

    const config = {
      schema: [Project.schema],
      sync: {
        user,
        partitionValue: user.identity,
      },
    };

    console.log(
      `ProjectsProvider: Attempting to open Realm for user ${
        user.identity
      } with config: ${JSON.stringify(config)}...`,
    );

    let canceled = false;

    Realm.open(config)
      .then(openedRealm => {
        if (canceled) {
          openedRealm.close();
          return;
        }
        realmRef.current = openedRealm;
        const syncProjects = openedRealm.objects('Project');
        openedRealm.addListener('change', () => {
          setProjects([...syncProjects]);
        });
        setProjects([...syncProjects]);
      })
      .catch(error => console.warn('Failed to open realm:', error));

    return () => {
      canceled = true;
      const realm = realmRef.current;
      if (realm != null) {
        realm.removeAllListeners();
        realm.close();
        realmRef.current = null;
      }
    };
  }, [user]);

  const createProject = (newProjectName, projectDesc, user) => {
    const realm = realmRef.current;

    realm.write(() => {
      realm.create(
        'Project',
        new Project({name: newProjectName || 'New Project', description: projectDesc, partition: user.identity, user_id: user.identity }),
      );
    });
  };

  return (
    <ProjectsContext.Provider
      value={{
        createProject,
        projects
      }}>
      {children}
    </ProjectsContext.Provider>
  );
};

const useProjects = () => {
  const value = useContext(ProjectsContext);
  if (value == null) {
    throw new Error('useProjects() called outside of a ProjectsProvider?');
  }
  return value;
};

export {ProjectsProvider, useProjects};
