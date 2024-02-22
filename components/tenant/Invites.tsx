import { Text, View } from "@common/Themed";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { useGetInvitesQuery } from "@toolkit/invitesApi";
import { useSelector } from "react-redux";
import { selectUser } from "@redux/selectors/auth";
import { scaleFont } from "../../utils/scaleFont";
import Invite from "./Invite";
// import {Invite as InviteType} from "./Invite";

type PropInvite = {
  filter: "all" | "pending" | "cleared";
  limit?: number;
};

const Invites = ({ filter = "all", limit }: PropInvite) => {
  const user = useSelector(selectUser);

  const { data, error, isLoading } = useGetInvitesQuery(user?._id || "0");
  const [filtered, setFiltered] = useState();

  if (error) {
    console.log(error);
  }
  console.log(data?.length);
  return (
    <>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.body}>
            {limit &&
              data &&
              data
                .slice(0, 3)
                .sort((a, b) => {
                  const dateA = new Date(a.created_at);
                  const dateB = new Date(b.created_at);
                  return dateA.getTime() - dateB.getTime();
                })
                .map((invite) => <Invite key={invite._id} invite={invite} />)}

            {!limit &&
              data &&
              (data?.filter((invite) => {
                console.log(invite);
                if (filter === "all") {
                  return true;
                }
                if (filter === "cleared") {
                  return !invite.status;
                }
                if (filter === "pending") {
                  return invite.status;
                }
              }).length > 0 ? (
                data
                  ?.filter((invite) => {
                    console.log(invite);
                    if (filter === "all") {
                      return true;
                    }
                    if (filter === "cleared") {
                      return !invite.status;
                    }
                    if (filter === "pending") {
                      return invite.status;
                    }
                  })
                  .map((invite) => <Invite invite={invite} />)
              ) : (
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Text style={{ fontFamily: "ManropeRegular", color: "#000" }}>
                    No Invites
                  </Text>
                </View>
              ))}

            {isLoading && <ActivityIndicator size={"large"} />}
          </View>
        </ScrollView>

        {/* <View style={styles.inviteContainer}>
          <View style={styles.inviteTop}>
            <Text style={styles.inviteTopTitle}>Plumber Idris</Text>
            <Text style={styles.inviteTopSub}>30/10/2024</Text>
          </View>
          <View style={styles.inviteBody}>
            <View style={styles.inviteDescription}>
              <Text style={styles.inviteDescriptionKey}> Purpose </Text>
              <Text style={styles.inviteDescriptionValue}> House service</Text>
            </View>
            <View style={styles.inviteDescription}>
              <Text style={styles.inviteDescriptionKey}> Duration </Text>
              <Text style={styles.inviteDescriptionValue}>
                21/10/2024 - 30/10/2024
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.inviteContainer}>
          <View style={styles.inviteTop}>
            <Text style={styles.inviteTopTitle}>Plumber Idris</Text>
            <Text style={styles.inviteTopSub}>30/10/2024</Text>
          </View>
          <View style={styles.inviteBody}>
            <View style={styles.inviteDescription}>
              <Text style={styles.inviteDescriptionKey}> Purpose </Text>
              <Text style={styles.inviteDescriptionValue}> House service</Text>
            </View>
            <View style={styles.inviteDescription}>
              <Text style={styles.inviteDescriptionKey}> Duration </Text>
              <Text style={styles.inviteDescriptionValue}>
                21/10/2024 - 30/10/2024
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.inviteContainer}>
          <View style={styles.inviteTop}>
            <Text style={styles.inviteTopTitle}>Plumber Idris</Text>
            <Text style={styles.inviteTopSub}>30/10/2024</Text>
          </View>
          <View style={styles.inviteBody}>
            <View style={styles.inviteDescription}>
              <Text style={styles.inviteDescriptionKey}> Purpose </Text>
              <Text style={styles.inviteDescriptionValue}> House service</Text>
            </View>
            <View style={styles.inviteDescription}>
              <Text style={styles.inviteDescriptionKey}> Duration </Text>
              <Text style={styles.inviteDescriptionValue}>
                21/10/2024 - 30/10/2024
              </Text>
            </View>
          </View>
        </View> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: scaleFont(18),
    fontFamily: "ManropeSemiBold",
    textAlign: "left",
  },
  invitesTab: {
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
  },
  scrollViewContent: {
    width: "100%",
  },
  container: {
    textAlign: "left",
    marginTop: 5,
    width: "100%",
    gap: 14,
    paddingTop: 10,
  },
  body: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    height: "100%",
    gap: 24,
    paddingTop: 2,
    paddingHorizontal: 2,
    marginBottom: 280,
  },
});

export default Invites;
