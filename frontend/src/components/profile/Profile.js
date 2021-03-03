import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { FlatList } from "react-native-web";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Spinner as Spinny } from "react-bootstrap";
//redux
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import { getCurrentUserPosts } from "../../actions/posts";

//custom compoenents
import Spinner from "../layout/CustomSpinner";
import colorScheme from "../../styles/mainColorPallete";

import styled from "styled-components";
import { MiniRecipeCard } from "../post/MiniRecipeCard";
import EmptyView from "../layout/EmptyView";

const StyledTabs = styled(Tabs)`
  color: ${colorScheme.orange};

  .react-tabs__tab--selected {
    background: ${colorScheme.lightBackground};
    border-color: ${colorScheme.lightBackground};
    color: ${colorScheme.blue};
    border-radius: 5px 5px 0 0;
  }
`;

const ProfileHeader = ({ user, profile }) => {
  // console.log(user);
  // console.log(profile);
  return (
    //Image
    //Avatar
    //Degree
    //Name
    <>
      <div style={{ 
        // display: "flex",
        justifyContent: 'center',
        textAlign: 'center'
        
        }}>
        <img
          src={user.avatar} //refactored to allow users to edit their profile pics
          alt="new"
          style={{
            height: 80,
            width: 80,
            borderRadius: 100,
            borderColor: "grey",
            borderWidth: 2,
            border: `2px solid ${colorScheme.blue}`,
            margin: 5,
            alignSelf: "center",
          }}
        />
        <div>
          <div>
            <h3>{user.name}</h3>
          </div>
          <div>{user.degree}</div>
          <div>{user.university}</div>
          {profile.bio}
        </div>

        {/* total posts */}
      </div>
      <div style={{ paddingTop: 5 }}>{profile.bio !== null && profile.bio}</div>
    </>
  );
};

const Profile = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  const [userRecipes, setUserRecipes] = useState([]);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(false);

  useEffect(() => {
    getCurrentProfile();
    setIsLoadingRecipes(true);
    getCurrentUserPosts().then((recipesArray) => {
      console.log(recipesArray);
      setUserRecipes(recipesArray);
      setIsLoadingRecipes(false)
    });
  }, []);

  // the profile is loading
  return loading && profile == null ? (
    <Spinner />
  ) : (
    <>
      <ProfileHeader user={user} profile={profile} />

      <StyledTabs>
        <TabList>
          <Tab>Posts</Tab>
          <Tab>Saved</Tab>
          <Tab>Locked</Tab>
        </TabList>

        <TabPanel
          style={{
            backgroundColor: colorScheme.lightBackground,
            marginTop: -11,
            // minHeight: 455
            height: 455,
            overflow: 'scroll'
          }}
        >
          {isLoadingRecipes ? <Spinny animation="border" style={{color: colorScheme.blue}}/> :
          userRecipes.length === 0 ? (
            <EmptyView type={"Created"} />
          ) : (
            <FlatList
              horizontal={false}
              data={userRecipes}
              keyExtractor={(item) => item._id}
              numColumns={3}
              renderItem={(recipe) => <MiniRecipeCard recipe={recipe.item} />}
            />
          )}
        </TabPanel>
        <TabPanel
          style={{
            backgroundColor: colorScheme.lightBackground,
            marginTop: -11,
            // minHeight: 455
            height: 455,
            overflow: 'scroll'
          }}
        >
          {/* Needs developed - empty view for now */}

          <EmptyView type={"Saved"} />
        </TabPanel>
        <TabPanel
          style={{
            backgroundColor: colorScheme.lightBackground,
            marginTop: -11,
            // minHeight: 455
            height: 455,
            overflow: 'scroll'
          }}
        >
          {/* Needs developed - empty view for now */}
          <EmptyView type={"Locked"} />
        </TabPanel>
      </StyledTabs>

    </>
  );
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
