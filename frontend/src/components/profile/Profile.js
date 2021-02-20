import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { FlatList } from "react-native-web";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

//redux
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import { getCurrentUserPosts } from "../../actions/posts";

//custom compoenents
import Spinner from "../layout/CustomSpinner";
import colorScheme from "../../styles/mainColorPallete";

import styled from "styled-components";
import { MiniRecipeCard } from "../post/MiniRecipeCard";


const StyledTabs = styled(Tabs)`
  color: ${colorScheme.orange};

  .react-tabs__tab--selected {
    background: ${colorScheme.lightBackground};
    border-color: ${colorScheme.lightBackground};
    color: ${colorScheme.blue};
    border-radius: 5px 5px 0 0;
  }
`;

const DisplayPosts = ({ userRecipes }) => {
  return userRecipes.map((recipe) => {
    console.log(recipe);
    return (
      // <div key={recipe._id}>
      //   <Link to={`/posts/${recipe._id}`}>{recipe.title}</Link>
      // </div>
      // <Link to={`/posts/${recipe._id}`}>
      // <StyledCard key={recipe.id}>
      //   <StyledImage src={`../../../../${recipe.image}`} />
      //   <StyledCardBody>
      //     <StyledCardText>
      //       {recipe.title}
      //       </StyledCardText>
      //       <StyledCardText>
      //       {recipe.totalPrice}{recipe.effortTime}
      //       </StyledCardText>

      //     {/* <CardFooter>
      //       {recipe.totolPrice}
      //       {recipe.effortTime}
      //     </CardFooter> */}
      //   </StyledCardBody>
      // </StyledCard>
      // </Link>
      <MiniRecipeCard recipe={recipe} />
    );
  });
};

const ProfileHeader = ({ user, profile }) => {
  // console.log(user);
  // console.log(profile);
  return (
    //Image
    //Avatar
    //Degree
    //Name
    <>
      <div style={{ display: "flex"}}>
        <img
          src={user.avatar} //refactored to allow users to edit their profile pics
          alt="new"
          style={{
            height: 80,
            width: 80,
            borderRadius: 100,
            borderColor: "grey",
            borderWidth: 2,
            border: "1px solid #33e",
            margin: 5,
            alignSelf: "center",
          }}
        />
        <div>
          <div>
            <h2>{user.name}</h2>
          </div>
          <div>{user.degree}</div>
          <div>{user.university}</div>
          {profile.bio}
        </div>

        {/* total posts */}
      </div>
      <div style={{ paddingTop: 5 }}>
        {profile.bio !== null && profile.bio}
      </div>
    </>
  );
};

const Profile = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    getCurrentProfile();
    getCurrentUserPosts().then((recipesArray) => {
      console.log(recipesArray);
      setUserRecipes(recipesArray);
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

        <TabPanel    style={{
              backgroundColor: colorScheme.lightBackground,
              marginTop: -11,
              minHeight: 30,
              minHeight: 515,
            }}
            >
          <FlatList
            horizontal={false}
            data={userRecipes}
            keyExtractor={(item) => item._id}
            numColumns={3}
            renderItem={(recipe) => <MiniRecipeCard recipe={recipe.item} />}
          />
        </TabPanel>
        <TabPanel    style={{
              backgroundColor: colorScheme.lightBackground,
              marginTop: -11,
              minHeight: 30,
              minHeight: 515,
            }}>
          <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel    style={{
              backgroundColor: colorScheme.lightBackground,
              marginTop: -11,
              minHeight: 30,
              minHeight: 515,
            }}>
          <h2>Any content 3</h2>
        </TabPanel>
      </StyledTabs>

      {/* <DisplayPosts userRecipes={userRecipes} /> */}
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
