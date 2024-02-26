import { Text, View } from "@common/Themed";
import React, { useState } from "react";
import { StyleSheet, Pressable, Image } from "react-native";
import { scaleFont } from "../../utils/scaleFont";
import { formateDate } from "../../utils/formatDate";
import { Invite as InviteType } from "../../types/Invite";

type PropType = { invite: InviteType };

const Invite = ({ invite }: PropType) => {
  return (
    <View colorName="tint" style={styles.inviteContainer}>
      <View style={styles.inviteTop}>
        <Text style={styles.inviteTopTitle}>{invite.guest}</Text>
        <Text style={styles.inviteTopSub}>{invite?.code}</Text>
      </View>
      <View style={styles.inviteBody}>
        <View style={styles.inviteDescription}>
          <Text style={styles.inviteDescriptionKey}>Code Type</Text>
          <Text style={styles.inviteDescriptionValue}>
            {invite?.codeType === "onetime" && "One Time"}
            {invite?.codeType === "recurring" && "Recurring"}
          </Text>
        </View>
        {invite?.codeType === "onetime" && (
          <View style={styles.inviteDescription}>
            <Text style={styles.inviteDescriptionKey}>Date Expected</Text>
            <Text style={styles.inviteDescriptionValue}>
              {invite.dateExpected ? formateDate(invite.dateExpected) : "-----"}
            </Text>
          </View>
        )}
        {invite?.codeType === "recurring" && (
          <>
            <View style={styles.inviteDescription}>
              <Text style={styles.inviteDescriptionKey}>Date Expected</Text>
              <Text style={styles.inviteDescriptionValue}>
                {invite.dateExpected
                  ? formateDate(invite.dateExpected)
                  : "-----"}
                {/* -{invite.validUntil ? formateDate(invite.validUntil) : "-----"} */}
              </Text>
            </View>
            <View style={styles.inviteDescription}>
              <Text style={styles.inviteDescriptionKey}>Valid Untill</Text>
              <Text style={styles.inviteDescriptionValue}>
                {invite.validUntil ? formateDate(invite.validUntil) : "-----"}
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inviteContainer: {
    height: 110,
    marginBottom: 15,
    maxWidth: 400,
    fontFamily: "ManropeBold",
    justifyContent: "center",
    gap: 6,
    shadowOffset: {
      width: 2,
      height: -2,
    },
    alignItems: "flex-start",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "98%",
    elevation: 2,
    shadowColor: "#060a11",
    shadowRadius: 2,
    shadowOpacity: 0.15,
  },
  inviteBody: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    display: "flex",
    width: "100%",
  },
  inviteTopTitle: {
    textTransform: "capitalize",
    fontSize: scaleFont(16),
    fontFamily: "ManropeSemiBold",
    color: "#000",
  },
  inviteTopSub: {
    fontSize: scaleFont(12),
    fontFamily: "ManropeSemiBold",
    color: "#979797",
  },
  inviteDescription: {
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 15,
    display: "flex",
    flexDirection: "row",
  },
  inviteDescriptionKey: {
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    color: "#979797",
    fontFamily: "ManropeSemiBold",
  },
  inviteDescriptionValue: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "2%",
    display: "flex",
    color: "#979797",
    fontSize: scaleFont(12),
    fontFamily: "ManropeMedium",
  },
  inviteTop: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Invite;
